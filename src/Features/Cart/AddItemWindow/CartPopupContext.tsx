import { createContext, useContext, useState } from "react";
import { ProductItem } from "@data/Models";

interface CartPopupContextType {
  isOpen: boolean;
  item: ProductItem | null;
  openPopup: (item: ProductItem) => void;
  closePopup: () => void;
}

const CartPopupContext = createContext<CartPopupContextType | undefined>(
  undefined
);

export function CartPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<ProductItem | null>(null);

  const openPopup = (product: ProductItem) => {
    setItem(product);
    setIsOpen(true);
  };

  const closePopup = () => {
    setItem(null);
    setIsOpen(false);
  };

  return (
    <CartPopupContext.Provider value={{ isOpen, item, openPopup, closePopup }}>
      {children}
    </CartPopupContext.Provider>
  );
}

export function useCartPopup() {
  const context = useContext(CartPopupContext);
  if (!context)
    throw new Error("useCartPopup must be used within CartPopupProvider");
  return context;
}
