import { useMutation, useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";
import { useState } from "react";

import { queryClient } from "../main";
import { TemplateModel } from "../DataService/Models/TemplateModel";

export const useTemplatesQuery = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading } = useQuery({
    queryKey: ["templates", page],
    queryFn: async () => {
      const [templates, count] = await dataService.GetAllTemplates(
        page,
        pageSize
      );

      return { templates, count };
    },
    cacheTime: Infinity,
    staleTime: 10000,
  });

  const fetchFullTemplate = useMutation({
    mutationFn: async (id: string) => {
      const fullTemplate = await dataService.GetTemplateById(id);
      return fullTemplate;
    },
    onSuccess: (fullTemplate) => {
      queryClient.setQueryData(["templates", page], (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          templates: oldData.templates.map((template: TemplateModel) =>
            template.assetId === fullTemplate.assetId ? fullTemplate : template
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
