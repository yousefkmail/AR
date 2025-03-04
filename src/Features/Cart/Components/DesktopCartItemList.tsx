import { CartItemListProps } from "./CartItemList";
import CartItemsHeader from "./CartItemsHeader";
import { CartItem } from "./CartItem";
import { CalculatePrice } from "@utils/CurrencyUtils";

export default function DesktopCartItemList({
  items,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemListProps) {
  return (
    <div className="desktop-cart-items-container">
      <CartItemsHeader />
      {items.map((item) => (
        <CartItem
          key={item.item.id}
          className="cart-item-container"
          quantity={item.quantity}
          {...item.item}
          price={CalculatePrice(item.item.price)}
          totalPrice={CalculatePrice(item.quantity, item.item.price)}
          onIncrease={() => onIncrease?.(item.item)}
          onDecrease={() => onDecrease?.(item.item)}
          onRemove={() => onRemove?.(item.item)}
        />
      ))}
    </div>
  );
}
