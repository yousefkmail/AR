import { BasisPlane } from "./BasisPlane";
import { PlaneBase } from "./PlaneBase";
import { PieceModel } from "../Models/PieceModel";

export class PiecePlane extends PlaneBase {
  parent: BasisPlane | null = null;
  baseWidth: number = 0;
  baseOffset: number = 0;
  category: string = "";
  constructor(data: PieceModel, id: number) {
    super(id, data);
    this.baseOffset = data.baseOffset;
    this.baseWidth = data.baseWidth;
    this.category = data.category;
  }

  setParent(BasisPlane: BasisPlane) {
    this.parent = BasisPlane;
  }

  removeParent() {
    this.parent = null;
  }
}
