import { useQuery } from "@tanstack/react-query";
import { siteDataService } from "../Services/Services";
export const useGlobalSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["globalSettings"],
    queryFn: siteDataService.GetGlobalSettings,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isLoading, data };
};
