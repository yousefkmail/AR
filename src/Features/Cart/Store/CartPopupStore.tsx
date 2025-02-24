import { ProductItem } from "@data/ProductItem";
import { create } from "zustand";

interface CartPopupStore {
  item: ProductItem | null;
  isOpen: boolean;
  setItem: (item: ProductItem) => void;
  setIsOpen: (state: boolean) => void;
}

export const useCartPopup = create<CartPopupStore>((set) => ({
  isOpen: false,
  item: null,
  setItem: (item) => {
    set(() => ({ item }));
  },
  setIsOpen: (state: boolean) => {
    set(() => ({ isOpen: state }));
  },
}));
