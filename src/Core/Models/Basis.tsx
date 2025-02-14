import { Plane } from "./PlaneModel";

interface Layer {
  name: string;
  positionOffset: number;
  width: number;
}

export interface Basis extends Plane {
  layers: Layer[];
}
