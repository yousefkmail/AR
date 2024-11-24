import { PlaneModel } from "./PlaneModel";

interface Layer {
  name: string;
  positionOffset: number;
}

export interface BasisModel extends PlaneModel {
  layers: Layer[];
}
