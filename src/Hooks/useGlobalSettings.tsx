import { useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";

export const useGlobalSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["globalSettings"],
    queryFn: async () => {
      const data = await dataService.GetGlobalSettings();
      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isLoading, data };
};
