import { ProductItem } from "@data";
import {
  IncrementalArrayThreshouldBehaviour,
  useIncrementalArray,
} from "@hooks";
import { CartItemType } from "../Models/CartItemType";

export function useCartItems() {
  const compareFn: (
    first: CartItemType<ProductItem>,
    second: CartItemType<ProductItem>
  ) => boolean = (
    first: CartItemType<ProductItem>,
    second: CartItemType<ProductItem>
  ) => {
    return first.item.id === second.item.id;
  };

  const { addItem, clearItems, decreaseItem, items, setItems, removeItem } =
    useIncrementalArray<CartItemType<ProductItem>>(
      compareFn,
      IncrementalArrayThreshouldBehaviour.delete
    );

  return { items, addItem, decreaseItem, clearItems, setItems, removeItem };
}
