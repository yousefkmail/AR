import { ProductItem } from "@data/ProductItem";
import { CartItemType } from "@features/Cart";
import MobileCartItemList from "./MobileCartItemList";
import DesktopCartItemList from "./DesktopCartItemList";
import { useMediaQuery } from "react-responsive";

export interface CartItemListProps {
  items: CartItemType<ProductItem>[];
  onIncrease?: (item: ProductItem) => void;
  onDecrease?: (item: ProductItem) => void;
  onRemove?: (item: ProductItem) => void;
}

export function CartItemList({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemListProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="cart-items">
      {isMobile ? (
        <MobileCartItemList
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
          items={items}
        />
      ) : (
        <DesktopCartItemList
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
          items={items}
        />
      )}
    </div>
  );
}
