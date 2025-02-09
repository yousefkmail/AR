import { Plane } from "./PlaneModel";

export interface Piece extends Plane {
  baseWidth: number;
  baseOffset: number;
  category: string;
  isFlipable: boolean;
  isFlipped: boolean;
}
