import { Plane } from "./PlaneModel";

export class Piece extends Plane {
  baseWidth: number = 0;
  baseOffset: number = 0;
  category: string = "";
  isFlipable: boolean = false;
}
