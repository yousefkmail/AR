import { createContext } from "react";
import { ProductItem } from "../../DataService/Models/ProductItem";
import { CartItem } from "./CartItem";

interface CartContextProps {
  addItem: (ProductItem: CartItem<ProductItem>) => void;
  removeItem: (ProductItem: ProductItem) => void;
  increaseItem: (ProductItem: ProductItem) => void;
  decreaseItem: (ProductItem: ProductItem) => void;
  increaseProductItem: (ProductItem: ProductItem) => void;
  decreaseProductItem: (ProductItem: ProductItem) => void;
  resetPieces: () => void;
  basesItems: CartItem<ProductItem>[] | undefined;
  piecesItems: CartItem<ProductItem>[] | undefined;
  items: CartItem<ProductItem>[];
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);
