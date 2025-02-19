import CartItemMobile from "./CartItemMobile";
import { CartItemListProps } from "./CartItemList";
import { CalculatePrice, MinimumPriceUnitToUSD } from "@utils/CurrencyUtils";

export default function MobileCartItemList({
  items,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemListProps) {
  return (
    <div>
      {items.map((item) => (
        <CartItemMobile
          onIncrease={() => onIncrease?.(item.item)}
          onDecrease={() => onDecrease?.(item.item)}
          onRemove={() => onRemove?.(item.item)}
          className="cart-item-container cart-item-container-mobile"
          quantity={item.quantity}
          id={item.item.id}
          name={item.item.name}
          previewImage={item.item.previewImage}
          price={MinimumPriceUnitToUSD(item.item.price)}
          totalPrice={CalculatePrice(item.quantity, item.item.price)}
          key={item.item.id}
        ></CartItemMobile>
      ))}
    </div>
  );
}
