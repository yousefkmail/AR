import { useEffect, useState } from "react";
import { Piece } from "../Data/Models/Piece";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase/firebaseApp";
import { Basis } from "../Data/Models/Basis";
export interface OptionType {
  value: string;
  label: string;
}

export const usePlanesQuery = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType>({
    value: "Base",
    label: "Base",
  });

  const [activePieces, setActivePieces] = useState<Piece[]>([]);

  const [categories, setCategories] = useState<OptionType[]>([]);

  const [pieces, setPieces] = useState<Piece[]>();
  const [basis, setBasis] = useState<Basis[]>();

  useEffect(() => {
    const piecesRef = collection(firestore, "pieces");

    // Listen for real-time changes
    const unsubscribe = onSnapshot(piecesRef, (snapshot) => {
      const updatedPieces = snapshot.docs.map((doc) => ({
        ...(doc.data() as Piece),
        id: doc.id,
      }));
      setPieces(updatedPieces);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const basesRef = collection(firestore, "bases");

    // Listen for real-time changes
    const unsubscribe = onSnapshot(basesRef, (snapshot) => {
      const updatedBasis = snapshot.docs.map((doc) => ({
        ...(doc.data() as Basis),
        id: doc.id,
      }));
      setBasis(updatedBasis);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

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
