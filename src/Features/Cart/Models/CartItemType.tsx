export interface CartItemType<T> {
  item: T;
  quantity: number;
  type: "collection" | "piece" | "base";
}
