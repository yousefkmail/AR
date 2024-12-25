import { PlaneBase } from "./PlaneBase";
import { Piece } from "../DataService/Models/PieceModel";

export class PiecePlane extends PlaneBase {
  baseWidth: number = 0;
  baseOffset: number = 0;
  isFlipable: boolean = false;
  category: string = "";
  constructor(data: Piece) {
    super(data);
    this.baseOffset = data.baseOffset;
    this.baseWidth = data.baseWidth;
    this.category = data.category;
    this.isFlipable = data.isFlipable;
  }
}
