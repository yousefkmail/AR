import { useMutation, useQuery } from "@tanstack/react-query";
import { backendDataService } from "../Services/Services";
import { useState } from "react";

import { queryClient } from "../main";
import { useNotification } from "../Features/NotificationService/NotificationContext";
import {
  LoadableTemplate,
  TemplateState,
} from "../Interfaces/LoadableTemplate";

export const useTemplatesQuery = () => {
  const { addNotification } = useNotification();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, isLoading } = useQuery({
    queryKey: ["templates", page],
    queryFn: async () => {
      const [templates, count] = await backendDataService.GetAllTemplates(
        page,
        pageSize
      );

      return {
        templates: templates.map((item) => {
          const itemm: LoadableTemplate = {
            template: item,
            state: TemplateState.NotLoaded,
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
            (Loadabletemplate: LoadableTemplate) => {
              if (Loadabletemplate.template.id === id) {
                const templatee: LoadableTemplate = {
                  template: Loadabletemplate.template,
                  state: TemplateState.Loading,
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
            (Loadabletemplate: LoadableTemplate) =>
              Loadabletemplate.template.id === fullTemplate.id
                ? { template: fullTemplate, state: TemplateState.Loaded }
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
