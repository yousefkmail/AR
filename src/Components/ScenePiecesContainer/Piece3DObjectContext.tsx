import { PieceObject } from "@data/R3F";
import { createContext } from "react";

export interface Piece3DObjectContextProps {
  pieceObject: PieceObject;
}

export const Piece3DObjectContext = createContext<Piece3DObjectContextProps>(
  null!
);
