import { ProductItem } from "../../Data/ProductItem";

export interface Plane extends ProductItem {
  width: number;
  height: number;
  stock: number;
}
