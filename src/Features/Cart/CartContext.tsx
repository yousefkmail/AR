import { createContext, useEffect, useReducer, useState } from "react";
import { ProductItem } from "../../DataService/Models/ProductItem";
import { dataService } from "../../Services/Services";
import { TemplateModel } from "../../DataService/Models/TemplateModel";

interface CartContextProps {
  addItem: (ProductItem: CartItem) => void;
  removeItem: (ProductItem: ProductItem) => void;
  increaseItem: (ProductItem: ProductItem) => void;
  decreaseItem: (ProductItem: ProductItem) => void;
  increaseProductItem: (id: string) => void;
  decreaseProductItem: (id: string) => void;
  resetPieces: () => void;
  productItems: CartItem[] | undefined;
  items: CartItem[];
}

interface RemovedItem {
  id: string;
  amount: number;
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
        const existsIndex = state.findIndex(
          (item) => item.item.id === action.payload.item.id
        );

        if (existsIndex !== -1) {
          // Item exists, increase the amount
          const updatedState = [...state];
          updatedState[existsIndex] = {
            ...updatedState[existsIndex],
            quantity:
              updatedState[existsIndex].quantity + action.payload.quantity,
          };
          return updatedState;
        } else {
          // Item does not exist, add it
          return [...state, action.payload];
        }
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
    if (!ids || ids.length < 1) {
      setUpdated(true);
      return [];
    }

    const data = await dataService.GetPiecesById(
      JSON.parse(ids).map(
        (item: { item: ProductItem; quantity: number }) => item.item.id
      )
    );
    setUpdated(true);

    dispatchCartItems({
      type: "set",
      payload: (JSON.parse(ids) as CartItem[]).map(({ ...item }) => ({
        quantity: item.quantity,
        item: {
          ...item.item,
          price:
            data.find((itemm) => itemm.id === item.item.id)?.price ??
            item.item.price,
          previewImage:
            data.find((itemm) => itemm.id === item.item.id)?.previewImage ??
            item.item.previewImage,
        },
      })),
    });
  };

  useEffect(() => {
    getInitialCart();
  }, []);

  const [items, dispatchCartItems] = useReducer(DispatchCartItems, []);

  const [removedItems, setRemovedItems] = useState<RemovedItem[]>([]);

  const [productItems, setProductItems] = useState<CartItem[]>();

  useEffect(() => {
    const itemss: CartItem[] = [];
    items.forEach((cartItem) => {
      if ("loadedData" in cartItem.item) {
        const parent = cartItem.item as TemplateModel;

        if (parent.loadedData) {
          const item = itemss.find(
            (itemmm) => itemmm.item.id === parent.loadedData?.basis.id
          );

          if (item) {
            item.quantity += cartItem.quantity;
          } else {
            itemss.push({
              quantity: cartItem.quantity,
              item: parent.loadedData.basis,
            });
          }
        }

        parent.loadedData?.children.forEach((child) => {
          const item = itemss.find((item) => item.item.id === child.data.id);

          if (item) {
            item.quantity += cartItem.quantity;
          } else {
            itemss.push({ quantity: cartItem.quantity, item: child.data });
          }
        });
      } else {
        const itemmm = itemss.find(
          (itemm) => itemm.item.id === cartItem?.item.id
        );

        if (itemmm) {
          itemmm.quantity++;
        } else {
          itemss.push({ quantity: cartItem.quantity, item: cartItem.item });
        }
      }
    });
    for (let item of itemss) {
      const foundItem = removedItems.find((itemm) => itemm.id === item.item.id);
      if (foundItem) {
        item.quantity = item.quantity + foundItem.amount;
      }
      if (item.quantity < 0) item.quantity = 0;
    }

    setProductItems(itemss);
  }, [items, removedItems]);

  const decreaseProductItem = (id: string) => {
    setRemovedItems((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) =>
            id === item.id ? { id, amount: item.amount - 1 } : item
          )
        : [...prev, { id, amount: -1 }]
    );
  };

  const increaseProductItem = (id: string) => {
    setRemovedItems((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) =>
            id === item.id ? { id, amount: item.amount + 1 } : item
          )
        : [...prev, { id, amount: 1 }]
    );
  };

  useEffect(() => {
    if (!updated) return;
    localStorage.setItem("cart", JSON.stringify(items));
  }, [updated, items]);

  const addItem = (item: CartItem) =>
    dispatchCartItems({ type: "add", payload: item });

  const removeItem = (item: ProductItem) =>
    dispatchCartItems({ type: "remove", payload: item });

  const increaseItem = (item: ProductItem) =>
    dispatchCartItems({ type: "increase", payload: item });

  const decreaseItem = (item: ProductItem) =>
    dispatchCartItems({ type: "decrease", payload: item });

  const resetPieces = () => {
    setRemovedItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        items,
        increaseItem,
        decreaseItem,
        increaseProductItem,
        decreaseProductItem,
        resetPieces,
        productItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
