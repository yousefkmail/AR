import { ProductItem } from "@data/ProductItem";
import { CartItemType } from "@features/Cart";
import { CartItemList } from "@features/Cart/Components/CartItemList";
import Button from "@components/Button/Button";

interface CartPiecesContainerProps {
  onIncrease?: (item: ProductItem) => void;
  onDecrease?: (item: ProductItem) => void;
  onRemove?: (item: ProductItem) => void;
  items: CartItemType<ProductItem>[];
  onResetPieces?: () => void;
}
export default function CartPiecesContainer({
  onResetPieces,
  ...rest
}: CartPiecesContainerProps) {
  return (
    <div className="cart-pieces-container">
      <div className="cart-pieces-top">
        <h2>Total pieces</h2>
        <Button onClick={() => onResetPieces?.()}>Reset pieces</Button>
      </div>
      <CartItemList {...rest} />
    </div>
  );
}
