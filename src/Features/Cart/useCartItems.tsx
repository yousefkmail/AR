import { ProductItem } from "../../DataService/Models/ProductItem";
import {
  IncrementalArrayThreshouldBehaviour,
  useIncrementalArray,
} from "../../Hooks/useIncrementalArray";
import { CartItem } from "./CartItem";

export function useCartItems() {
  const compareFn: (
    first: CartItem<ProductItem>,
    second: CartItem<ProductItem>
  ) => boolean = (
    first: CartItem<ProductItem>,
    second: CartItem<ProductItem>
  ) => {
    return first.item.id === second.item.id;
  };

  const { addItem, clearItems, decreaseItem, items, setItems, removeItem } =
    useIncrementalArray<CartItem<ProductItem>>(
      compareFn,
      IncrementalArrayThreshouldBehaviour.delete
    );

  return { items, addItem, decreaseItem, clearItems, setItems, removeItem };
}
