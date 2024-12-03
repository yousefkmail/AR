import { BasisPlane } from "./BasisPlane";

export class Template {
  preview: string = "";
  price: number = 0;
  name: string = "";
  tags: string[] = [];
  data: BasisPlane;
  constructor(data: BasisPlane) {
    this.data = data;
  }
}
