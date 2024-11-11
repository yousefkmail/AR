import { useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";

export const useQueryData = () => {
  const { data: pieces } = useQuery({
    queryKey: ["pieces"],
    queryFn: async () => {
      return await dataService.GetAllPieces();
    },
  });

  const { data: basis } = useQuery({
    queryKey: ["basis"],
    queryFn: async () => {
      return await dataService.GetAllBasis();
    },
  });

  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      return await dataService.GetAllTemplates();
    },
  });

  return { pieces, basis, templates };
};
