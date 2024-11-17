import { PiecePlane } from "./PiecePlane";
import { PlaneBase } from "./PlaneBase";
import { BasisModel } from "../Models/BasisModel";
import { Vector3 } from "three";

class BasisLayer {
  children: PiecePlane[] = [];
  positionOffset: number = 0;
}

export class BasisPlane extends PlaneBase {
  children: PiecePlane[] = [];
  layers: BasisLayer[] = [new BasisLayer()];
  constructor(data: BasisModel, id: number) {
    super(id, data);
  }

  addChild(child: PiecePlane, layer: number = 0, pos: Vector3) {
    if (!this.layers[layer].children.includes(child)) {
      this.layers[layer].children.push(child);
      child.setParent(this);
      child.rotation = new Vector3(-90, 0, 0);
      child.position = pos;
    }
  }

  // Method to remove a child node
  removeChild(child: PiecePlane) {
    this.layers.forEach((layer) => {
      const index = layer.children.indexOf(child);
      if (index !== -1) {
        layer.children.splice(index, 1);
        child.parent = null;
      }
    });
  }
}
