import { PlaneBase } from "./PlaneBase";
export interface Layer {
  name: string;
  positionOffset: number;
}

export interface BasisType extends PlaneBase {
  contentTypeId: "basis";

  fields: PlaneBase["fields"] & {
    layers: Layer[];
  };
}
