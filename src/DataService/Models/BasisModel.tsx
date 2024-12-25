import { Plane } from "./PlaneModel";

interface Layer {
  name: string;
  positionOffset: number;
  width: number;
}

export class Basis extends Plane {
  layers: Layer[] = [];
}
