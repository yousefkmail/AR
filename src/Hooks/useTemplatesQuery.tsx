import { useMutation, useQuery } from "@tanstack/react-query";
import { backendDataService } from "../Services/Services";
import { useState } from "react";

import { queryClient } from "../main";
import { useNotification } from "../Features/NotificationService/NotificationContext";
import { UnresolvedTemplateModel } from "@data/Models";
import { ResolvedTemplateModel } from "@data/Models/TemplateModel";

export const useTemplatesQuery = () => {
  const { addNotification } = useNotification();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, isLoading } = useQuery<{
    templates: (ResolvedTemplateModel | UnresolvedTemplateModel)[];
    count: number;
  }>({
    queryKey: ["templates", page],
    queryFn: async () => {
      const [templates, count] = await backendDataService.GetAllTemplates(
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

      const fullTemplate = await backendDataService.GetTemplateById(id);

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
