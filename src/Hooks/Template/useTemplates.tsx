import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ResolvedTemplateModel, UnresolvedTemplateModel } from "@core/index";
import { templateService } from "../../Services/Services";
import { queryClient } from "@lib/ReactQuery/Client";
import { useAddNotification } from "@features/NotificationService/useAddNotification";

export const useTemplates = () => {
  const addNotification = useAddNotification();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, isLoading } = useQuery<{
    templates: (ResolvedTemplateModel | UnresolvedTemplateModel)[];
    count: number;
  }>({
    queryKey: ["templates", page],
    queryFn: async () => {
      const [templates, count] = await templateService.GetAllTemplates(
        page,
        pageSize
      );
      return {
        templates: templates.map((item) => {
          const itemm: ResolvedTemplateModel | UnresolvedTemplateModel = {
            ...item,
            state: "NotLoaded",
          };
          return itemm;
        }),
        count,
      };
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const fetchFullTemplate = useMutation({
    mutationFn: async ({ id, page }: { id: string; page: number }) => {
      queryClient.setQueryData(["templates", page], (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          templates: oldData.templates.map(
            (
              Loadabletemplate: ResolvedTemplateModel | UnresolvedTemplateModel
            ) => {
              if (Loadabletemplate.id === id) {
                const templatee: UnresolvedTemplateModel = {
                  ...(Loadabletemplate as UnresolvedTemplateModel),
                  state: "Loading",
                };
                return templatee;
              } else return Loadabletemplate;
            }
          ),
        };
      });

      const fullTemplate = await templateService.GetTemplateById(id);

      return fullTemplate;
    },
    onSuccess: (fullTemplate, { page }) => {
      queryClient.setQueryData(["templates", page], (oldData: any) => {
        if (!oldData) return;

        addNotification(
          `template ${fullTemplate.name} loaded successfully.`,
          "success"
        );
        return {
          ...oldData,
          templates: oldData.templates.map(
            (
              Loadabletemplate: ResolvedTemplateModel | UnresolvedTemplateModel
            ) =>
              Loadabletemplate.id === fullTemplate.id
                ? { ...fullTemplate, state: "Loaded" }
                : Loadabletemplate
          ),
        };
      });
    },
  });

  return {
    templates: data?.templates,
    count: data?.count,
    isLoading,
    setPage,
    page,
    pageSize,
    setPageSize,
    fetchFullTemplate: fetchFullTemplate.mutate, // Expose mutation method
  };
};
