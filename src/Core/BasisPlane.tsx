import { PlaneBase } from "./PlaneBase";
import { Basis } from "../DataService/Models/BasisModel";

class BasisLayer {
  name: string = "";
  positionOffset: number = 0;
  width: number = 0;
}

export class BasisPlane extends PlaneBase {
  layers: BasisLayer[] = [new BasisLayer()];
  constructor(data: Basis) {
    super(data);
    this.layers = data.layers.map((layer) => ({
      children: [],
      positionOffset: layer.positionOffset,
      name: layer.name,
      width: layer.width,
    }));
  }
}
