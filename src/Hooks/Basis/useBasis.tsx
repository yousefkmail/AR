import { useQuery } from "@tanstack/react-query";
import { basisService } from "src/Services/Services";

export const useBasis = (id: string) => {
  const { data: bases, isLoading } = useQuery({
    queryKey: ["basis", id],
    queryFn: () => basisService.getBasisById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return { bases, isLoading };
};
