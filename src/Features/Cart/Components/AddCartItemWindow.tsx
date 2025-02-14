import { v4 as uuidv4 } from "uuid";
import { useCart } from "../Hooks/useCart";
import { useCartPopup } from "../Contexts/CartPopupContext";
import { CollectionAddToCartPopup } from "@features/ContextMenu";

export default function AddCartItemWindow() {
  const { isOpen, item, closePopup } = useCartPopup();
  const { addItem } = useCart();

  const AddToCart = (quantity: number, name: string) => {
    if (!item) return;
    const newItem = { ...item, name, id: uuidv4() };
    addItem({ quantity, item: newItem });
    closePopup();
  };

  return (
    <div style={{ zIndex: "9999", position: "relative" }}>
      <CollectionAddToCartPopup
        isShown={isOpen}
        name={item?.name}
        nameEditable={item ? "base" in item : false}
        onAddToCartPressed={AddToCart}
        onClose={closePopup}
      />
    </div>
  );
}
