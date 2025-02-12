import { ProductItem } from "../../Data/Models/ProductItem";
import {
  IncrementalArrayThreshouldBehaviour,
  useIncrementalArray,
} from "../../Hooks/useIncrementalArray";
import { CartItemType } from "./CartItem";

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
