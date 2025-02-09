import { DocumentReference } from "firebase/firestore";
import { Basis } from "./Basis";
import { Piece } from "./Piece";
import { ProductItem } from "./ProductItem";

export interface PieceChild {
  id: string;
  layer: number;
  piece: Piece;
  position: [number, number, number];
}

interface UnresolvedPieceChild {
  id: string;
  layer: number;
  piece: DocumentReference;
  position: [number, number, number];
}

export interface TemplateModel extends ProductItem {
  base: Basis;
  children: PieceChild[];
}

export interface UnresolvedTemplateModel extends ProductItem {
  base: DocumentReference;
  children: UnresolvedPieceChild[];
}
