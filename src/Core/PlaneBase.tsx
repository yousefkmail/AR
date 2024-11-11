import { Vector3 } from "three";
import { PlaneModel } from "../Models/PlaneModel";

export class PlaneBase {
  id: number = 0;
  name: string = "";
  texture: string = "";
  width: number = 0;
  height: number = 0;
  assetId: string = "";
  position: Vector3 = new Vector3(1, 1, 1);
  rotation: Vector3 = new Vector3(0, 0, 0);
  constructor(id: number, data: PlaneModel) {
    this.id = id;
    this.assetId = data.assetId;
    this.texture = data.texture;
    this.height = data.height;
    this.width = data.width;
    this.name = data.name;
  }
}
