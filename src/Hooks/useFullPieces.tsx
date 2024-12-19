import { useContext } from "react";
import { PiecesContext } from "../Context/PiecesContext";

export const useFullPieces = () => {
  const props = useContext(PiecesContext);
  return { ...props };
};
