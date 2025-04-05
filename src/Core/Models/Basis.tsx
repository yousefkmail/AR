import { Plane } from "./PlaneModel";

interface Layer {
  name: string;
  positionOffset: number;
  posX: number;
  posY: number;
  width: number;
}

export interface Basis extends Plane {
  layers: Layer[];
}
