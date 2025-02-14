import { createContext } from "react";
import { CartItemType } from "../Models/CartItemType";
import { ProductItem } from "@data";

interface CartContextProps {
  addItem: (ProductItem: CartItemType<ProductItem>) => void;
  removeItem: (ProductItem: ProductItem) => void;
  increaseItem: (ProductItem: ProductItem) => void;
  decreaseItem: (ProductItem: ProductItem) => void;
  increaseProductItem: (ProductItem: ProductItem) => void;
  decreaseProductItem: (ProductItem: ProductItem) => void;
  resetPieces: () => void;
  basesItems: CartItemType<ProductItem>[] | undefined;
  piecesItems: CartItemType<ProductItem>[] | undefined;
  items: CartItemType<ProductItem>[];
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);
