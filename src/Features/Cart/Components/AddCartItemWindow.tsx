import { CollectionAddToCartPopup } from "@features/ContextMenu";
import { v4 as uuidv4 } from "uuid";
import useCartStore from "../Store/CartStore";
import { useCartPopup } from "../Store/CartPopupStore";
import { TemplateModel } from "@core/index";
import { CalculateTemplatePrice } from "@utils/PriceUtils";
import { CartItemType } from "../Models/CartItemType";
import { ProductItem } from "@data/ProductItem";

export default function AddCartItemWindow() {
  const { isOpen, item, setIsOpen } = useCartPopup();

  const addItem = useCartStore((state) => state.addItem);
  const AddToCart = (quantity: number, name: string) => {
    if (!item) return;

    const cartItem: CartItemType<ProductItem> = {
      item: { ...item },
      quantity,
      type: "collection",
    };

    if ("base" in cartItem.item) {
      cartItem.item.previewImage = "";
      cartItem.item.price = CalculateTemplatePrice(item as TemplateModel);
      cartItem.item.name = name;
      cartItem.item.id = uuidv4();
    } else if ("layers" in cartItem.item) {
      cartItem.type = "base";
    } else {
      cartItem.type = "piece";
      console.log(cartItem);
    }
    addItem(cartItem);
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
