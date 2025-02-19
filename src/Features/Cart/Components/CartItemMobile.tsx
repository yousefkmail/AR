import { CartItemProps } from "./CartItem";
import MobileCartItemPriceField from "./MobileCartItemPriceField";
import MobileCartItemQuantityChanger from "./MobileCartItemQuantityChanger";
import MobileCartItemHeader from "./MobileCartItemHeader";

export default function CartItemMobile({
  name,
  price,
  quantity,
  totalPrice,
  previewImage,
  onIncrease,
  onDecrease,
  onRemove,
  ...rest
}: CartItemProps) {
  return (
    <div {...rest}>
      <MobileCartItemHeader
        name={name}
        previewImage={previewImage}
        onRemove={onRemove}
      />
      <MobileCartItemPriceField label="Price" price={price} />
      <MobileCartItemQuantityChanger
        canDecrease={quantity > 0}
        quantity={quantity}
        onDecrease={() => onDecrease?.()}
        onIncrease={() => onIncrease?.()}
      />

      <MobileCartItemPriceField label="Total price:" price={totalPrice} />
    </div>
  );
}
