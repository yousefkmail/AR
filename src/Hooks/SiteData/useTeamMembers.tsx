import { siteDataService } from "@services/Services";
import { useQuery } from "@tanstack/react-query";
export const useTeamMembers = () => {
  const { data: TeamMembers, isLoading } = useQuery({
    queryKey: ["teamMembers"],

    queryFn: siteDataService.GetTeamMembers,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return { TeamMembers, isLoading };
};
