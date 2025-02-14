import { useQuery } from "@tanstack/react-query";
import { pieceService } from "src/Services/Services";

export const usePieces = () => {
  const { data: bases, isLoading } = useQuery({
    queryKey: ["pieces"],
    queryFn: pieceService.getAllPieces,
    staleTime: 1000 * 60 * 5,
  });

  return { bases, isLoading };
};
