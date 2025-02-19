import { siteDataService } from "@services/Services";
import { useQuery } from "@tanstack/react-query";

export const useAboutSections = () => {
  const { data: AboutSections, isLoading } = useQuery({
    queryKey: ["aboutSections"],
    queryFn: siteDataService.GetAboutSections,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { AboutSections, isLoading };
};
