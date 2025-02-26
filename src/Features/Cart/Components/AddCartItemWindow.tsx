import { v4 as uuidv4 } from "uuid";
import { CollectionAddToCartPopup } from "@features/ContextMenu";
import useCartStore from "../Store/CartStore";
import { useCartPopup } from "../Store/CartPopupStore";
import { TemplateModel } from "@core/index";
import { CalculateTemplatePrice } from "@utils/PriceUtils";

export default function AddCartItemWindow() {
  const { isOpen, item, setIsOpen } = useCartPopup();

  const addItem = useCartStore((state) => state.addItem);
  const AddToCart = (quantity: number, name: string) => {
    if (!item) return;
    if ("base" in item) {
      (item as TemplateModel).previewImage = "";
      item.price = CalculateTemplatePrice(item as TemplateModel);
    }
    const newItem = { ...item, name, id: uuidv4() };
    addItem({ quantity, item: newItem });
    setIsOpen(false);
  };

  return (
    <div className="cart-add-item-window">
      <CollectionAddToCartPopup
        className="cart-add-item-container"
        style={{
          top: isOpen ? "50px" : "-500px",
        }}
        name={item?.name}
        nameEditable={item ? "base" in item : false}
        onAddToCartPressed={AddToCart}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
