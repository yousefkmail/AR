import { useQuery } from "@tanstack/react-query";
import { FirebaseBasisService } from "src/Services/Firebase/FirebaseBasisService";
import { basisService } from "src/Services/Services";

FirebaseBasisService;
export const useBases = () => {
  const { data: bases, isLoading } = useQuery({
    queryKey: ["bases"],
    queryFn: basisService.getAllBasis,
    staleTime: 1000 * 60 * 5,
  });

  return { bases, isLoading };
};
