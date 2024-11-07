import { useContext } from "react";
import { DragContext } from "../Context/DragContext";

export const useDragPiece = () => {
  const props = useContext(DragContext);

  return { ...props };
};
