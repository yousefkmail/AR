import { Vector3 } from "three";
import { Plane } from "../DataService/Models/PlaneModel";

export class PlaneBase {
  id: string = "";
  name: string = "";
  previewImage: string = "";
  width: number = 0;
  height: number = 0;
  position: Vector3 = new Vector3(1, 1, 1);
  rotation: Vector3 = new Vector3(0, 0, 0);
  price: number = 0;
  scale: Vector3 = new Vector3(1, 1, 1);
  description: string = "";
  constructor(data: Plane) {
    this.id = data.id;
    this.previewImage = data.previewImage;
    this.height = data.height;
    this.width = data.width;
    this.name = data.name;
  }
}
