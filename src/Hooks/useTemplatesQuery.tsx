import { useMutation, useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";
import { useState } from "react";

import { queryClient } from "../main";
import { useNotification } from "../Features/NotificationService/NotificationContext";
import { LoadableTemplate } from "../Interfaces/LoadableTemplate";

export const useTemplatesQuery = () => {
  const { addNotification } = useNotification();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, isLoading } = useQuery({
    queryKey: ["templates", page],
    queryFn: async () => {
      const [templates, count] = await dataService.GetAllTemplates(
        page,
        pageSize
      );

      return {
        templates: templates.map((item) => {
          const itemm: LoadableTemplate = { isLoading: false, template: item };
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
          templates: oldData.templates.map((template: LoadableTemplate) => {
            if (template.template.id === id) {
              const templatee = { ...template };
              templatee.isLoading = true;
              return templatee;
            } else return template;
          }),
        };
      });

      const fullTemplate = await dataService.GetTemplateById(id);

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
          templates: oldData.templates.map((template: LoadableTemplate) =>
            template.template.id === fullTemplate.id
              ? { template: fullTemplate, isLoading: false }
              : template
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
