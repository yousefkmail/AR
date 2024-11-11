import { useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";
import { useState } from "react";

export const useTemplatesQuery = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);

  const { data, isLoading } = useQuery({
    queryKey: ["templates", page],
    queryFn: async () => {
      const [templates, count] = await dataService.GetAllTemplates(
        page,
        pageSize
      );
      return { templates, count };
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
  };
};
