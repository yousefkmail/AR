import { Piece } from "../DataService/Models/PieceModel";

export interface PieceObject {
  piece: Piece;
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}
