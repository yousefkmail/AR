import { createContext, useEffect, useReducer } from "react";
import { ProductItem } from "../../DataService/Models/ProductItem";

interface CartContextProps {
  addItem: (ProductItem: CartItem) => void;
  removeItem: (ProductItem: ProductItem) => void;
  items: CartItem[];
}

interface CartItem {
  item: ProductItem;
  quantity: number;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

type DispatchCartAction =
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: ProductItem }
  | { type: "increase"; payload: ProductItem }
  | { type: "decrease"; payload: ProductItem };

export function CartContextProvider({ children }: any) {
  const DispatchCartItems = (state: CartItem[], action: DispatchCartAction) => {
    switch (action.type) {
      case "add": {
        const exists = state.some(
          (item) => item.item.id === action.payload.item.id
        );
        return exists ? state : [...state, action.payload];
      }

      case "remove": {
        return state.filter((item) => item.item.id !== action.payload.id);
      }

      case "increase": {
        return state.map((cartItem) =>
          cartItem.item.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      case "decrease": {
        return state.map((cartItem) =>
          cartItem.item.id === action.payload.id && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }

      default:
        return state;
    }
  };

  const [items, dispatchCartItems] = useReducer(DispatchCartItems, []);

  const addItem = (item: CartItem) =>
    dispatchCartItems({ type: "add", payload: item });

  const removeItem = (item: ProductItem) =>
    dispatchCartItems({ type: "remove", payload: item });

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <CartContext.Provider value={{ addItem, removeItem, items }}>
      {children}
    </CartContext.Provider>
  );
}
