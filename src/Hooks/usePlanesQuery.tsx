import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataService } from "../Services/Services";
import { PieceModel } from "../DataService/Models/PieceModel";
export interface OptionType {
  value: string;
  label: string;
}

export const usePlanesQuery = () => {
  const [activePieces, setActivePieces] = useState<PieceModel[]>([]);

  const [selectedOption, setSelectedOption] = useState<OptionType>({
    value: "Base",
    label: "Base",
  });

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
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const SetPiecesCategoryAsActivePlanes = (category: string) => {
    const items = pieces?.filter((item) => item.category === category);

    if (items) setActivePieces(items);
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
    if (!selectedOption) {
      setSelectedOption(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    SetCategories();
  }, [basis, pieces]);

  return {
    pieces,
    basis,
    activePieces,
    selectedOption,
    setSelectedOption,
    SetPiecesCategoryAsActivePlanes,
    categories,
  };
};
