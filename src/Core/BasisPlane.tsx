import { PiecePlane } from "./PiecePlane";
import { PlaneBase } from "./PlaneBase";
import { BasisModel } from "../Models/BasisModel";
import { MathUtils, Vector3 } from "three";

class BasisLayer {
  name: string = "";
  positionOffset: number = 0;
}
class LayeredChild {
  child: PiecePlane;
  layerIndex: number = 0;

  constructor(child: PiecePlane, layerIndex: number = 0) {
    this.child = child;
    this.layerIndex = layerIndex;
  }
}
export class BasisPlane extends PlaneBase {
  layers: BasisLayer[] = [new BasisLayer()];
  children: LayeredChild[] = [];
  constructor(data: BasisModel, id: number) {
    super(id, data);
    this.layers = data.layers.map((layer) => ({
      children: [],
      positionOffset: layer.positionOffset,
      name: layer.name,
    }));
  }

  addChild(child: PiecePlane, layer: number = 0, pos: number) {
    if (!this.children.find((childd) => childd.child === child)) {
      child.setParent(this);
      child.position = new Vector3(pos, 0, 0);
      child.rotation = new Vector3(-90, 0, 0);
      this.children.push(new LayeredChild(child, layer));
    }
  }

  UpdateChildLayer(child: PiecePlane, layer: number) {
    this.children = this.children.map((item) =>
      item.child === child ? { child: item.child, layerIndex: layer } : item
    );
  }

  removeChild(child: PiecePlane) {
    this.children = this.children.filter(
      (childd) => childd.child.id === child.id
    );
  }
}
