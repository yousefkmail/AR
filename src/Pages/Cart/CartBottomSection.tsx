import Button from "@components/atoms/Buttons/Button";
import { ProductItem } from "@data/ProductItem";
import { CartItemType } from "@features/Cart";
import { CartSummary } from "@features/Cart/Components/CartSummary";
interface CartBottomSectionProps {
  productItems: CartItemType<ProductItem>[];
  onContinuePressed?: () => void;
}

export default function CartBottomSection({
  productItems,
  onContinuePressed,
}: CartBottomSectionProps) {
  return (
    <div className="cart-bottom-container">
      <CartSummary className="cart-summary" productItems={productItems} />
      <Button
        onClick={() => {
          onContinuePressed?.();
        }}
      >
        Continue
      </Button>
    </div>
  );
}
