import { useContext } from "react";
import { PiecesContext } from "../Context/PiecesContext";

export const usePieces = () => {
  const props = useContext(PiecesContext);
  return { ...props };
};
