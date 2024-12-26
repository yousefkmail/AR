import { createContext, useEffect, useReducer, useState } from "react";
import { ProductItem } from "../../DataService/Models/ProductItem";
import { dataService } from "../../Services/Services";

interface CartContextProps {
  addItem: (ProductItem: CartItem) => void;
  removeItem: (ProductItem: ProductItem) => void;
  increaseItem: (ProductItem: ProductItem) => void;
  decreaseItem: (ProductItem: ProductItem) => void;
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
  | { type: "decrease"; payload: ProductItem }
  | { type: "set"; payload: CartItem[] };

export function CartContextProvider({ children }: any) {
  const [updated, setUpdated] = useState(false);

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
      case "set": {
        return action.payload;
      }

      default:
        return state;
    }
  };

  const getInitialCart = async () => {
    const ids = localStorage.getItem("cart");
    if (!ids) {
      setUpdated(true);
      return [];
    }
    const data = await dataService.GetPiecesById(
      JSON.parse(ids).map((item: { id: string; quantity: number }) => item.id)
    );
    setUpdated(true);
    dispatchCartItems({
      type: "set",
      payload: data.map((item) => ({
        item: item,
        quantity:
          (JSON.parse(ids) as { id: string; quantity: number }[]).find(
            (itemm) => itemm.id === item.id
          )?.quantity ?? 0,
      })),
    });
    console.log(data);
  };

  useEffect(() => {
    getInitialCart();
  }, []);

  const [items, dispatchCartItems] = useReducer(DispatchCartItems, []);

  useEffect(() => {
    if (!updated) return;
    localStorage.setItem(
      "cart",
      JSON.stringify(
        items.map((item) => ({ id: item.item.id, quantity: item.quantity }))
      )
    );
  }, [updated, items]);

  const addItem = (item: CartItem) =>
    dispatchCartItems({ type: "add", payload: item });

  const removeItem = (item: ProductItem) =>
    dispatchCartItems({ type: "remove", payload: item });

  const increaseItem = (item: ProductItem) =>
    dispatchCartItems({ type: "increase", payload: item });

  const decreaseItem = (item: ProductItem) =>
    dispatchCartItems({ type: "decrease", payload: item });

  return (
    <CartContext.Provider
      value={{ addItem, removeItem, items, increaseItem, decreaseItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
