import { PlaneBase } from "./PlaneBase";
import { BasisModel } from "../DataService/Models/BasisModel";

class BasisLayer {
  name: string = "";
  positionOffset: number = 0;
}

export class BasisPlane extends PlaneBase {
  layers: BasisLayer[] = [new BasisLayer()];
  constructor(data: BasisModel, id: string) {
    super(id, data);
    this.layers = data.layers.map((layer) => ({
      children: [],
      positionOffset: layer.positionOffset,
      name: layer.name,
    }));
  }
}
