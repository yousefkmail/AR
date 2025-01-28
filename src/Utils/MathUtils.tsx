import { Vector3 } from "three";

export const ArrayToVector3 = (items: number[]) => {
  return new Vector3(items[0] ?? 0, items[1] ?? 0, items[2] ?? 0);
};
