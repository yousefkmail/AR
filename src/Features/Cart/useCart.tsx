import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCart = () => {
  const items = useContext(CartContext);

  if (!items) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return { ...items };
};
