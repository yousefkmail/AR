import { createContext, useContext, useState } from "react";
import { TemplateModel } from "@data/Models";

interface CartPopupContextType {
  isOpen: boolean;
  item: TemplateModel | null;
  openPopup: (item: TemplateModel) => void;
  closePopup: () => void;
}

const AddTemplateWindowContext = createContext<
  CartPopupContextType | undefined
>(undefined);

export function AddTemplatePopupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<TemplateModel | null>(null);

  const openPopup = (product: TemplateModel) => {
    setItem(product);
    setIsOpen(true);
  };

  const closePopup = () => {
    setItem(null);
    setIsOpen(false);
  };

  return (
    <AddTemplateWindowContext.Provider
      value={{ isOpen, item, openPopup, closePopup }}
    >
      {children}
    </AddTemplateWindowContext.Provider>
  );
}

export function useAddTemplatePopup() {
  const context = useContext(AddTemplateWindowContext);
  if (!context)
    throw new Error("useCartPopup must be used within AddTemplateProvider");
  return context;
}
