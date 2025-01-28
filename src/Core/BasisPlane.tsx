import { Basis } from "../DataService/Models/BasisModel";

class BasisLayer {
  name: string = "";
  positionOffset: number = 0;
  width: number = 0;
}

export interface BasisObject {
  basis: Basis;
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  layers: BasisLayer[];
}
