import { useContext } from "react";
import { UIDraggedPieceContext } from "../Context/UIDraggedPieceContext";

export const useUIDraggedWigit = () => {
  const data = useContext(UIDraggedPieceContext);
  return { ...data };
};
