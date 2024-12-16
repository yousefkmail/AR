import { PlaneBase } from "./PlaneBase";
import { PieceModel } from "../DataService/Models/PieceModel";

export class PiecePlane extends PlaneBase {
  baseWidth: number = 0;
  baseOffset: number = 0;
  category: string = "";
  constructor(data: PieceModel, id: string) {
    super(id, data);
    this.baseOffset = data.baseOffset;
    this.baseWidth = data.baseWidth;
    this.category = data.category;
  }
}
