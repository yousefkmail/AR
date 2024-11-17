import { useEffect, useState } from "react";
import { PlaneModel } from "../Models/PlaneModel";
import { useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";
export interface OptionType {
  value: string;
  label: string;
}

export const usePlanesQuery = () => {
  const [activePlanes, setActivePlanes] = useState<PlaneModel[]>([]);
  const [categories, setCategories] = useState<OptionType[]>([]);

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

  const SetBasisAsActivePlanes = () => {
    if (basis) setActivePlanes(basis);
  };

  const SetPiecesCategoryAsActivePlanes = (category: string) => {
    const items = pieces?.filter((item) => item.category === category);

    if (items) setActivePlanes(items);
  };

  const SetCategories = () => {
    const cats: string[] = [];
    const options: OptionType[] = [];
    options.push({ label: "Base", value: "Base" });
    pieces?.forEach((item) => {
      if (!cats.includes(item.category)) {
        cats.push(item.category);
        options.push({
          value: item.category,
          label: item.category[0].toUpperCase() + item.category.slice(1),
        });
      }
    });

    setCategories(options);
  };

  useEffect(() => {
    SetCategories();
    SetBasisAsActivePlanes();
  }, [basis, pieces]);

  return {
    pieces,
    basis,
    activePlanes,
    SetBasisAsActivePlanes,
    SetPiecesCategoryAsActivePlanes,
    categories,
  };
};
