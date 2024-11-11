import { PlaneModel } from "./PlaneModel";

export interface PieceModel extends PlaneModel {
  baseWidth: number;
  baseOffset: number;
  category: string;
}
