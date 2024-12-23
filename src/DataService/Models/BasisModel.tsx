import { PlaneModel } from "./PlaneModel";

interface Layer {
  name: string;
  positionOffset: number;
  width: number;
}

export interface BasisModel extends PlaneModel {
  layers: Layer[];
}
