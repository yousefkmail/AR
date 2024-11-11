import { PiecePlane } from "./PiecePlane";
import { PlaneBase } from "./PlaneBase";
import { BasisModel } from "../Models/BasisModel";

export class BasisPlane extends PlaneBase {
  children: PiecePlane[] = [];
  constructor(data: BasisModel, id: number) {
    super(id, data);
  }

  addChild(child: PiecePlane) {
    if (child && !this.children.includes(child)) {
      this.children.push(child);
      child.setParent(this);
    }
  }

  // Method to remove a child node
  removeChild(child: PiecePlane) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }
}
