import { QuantityChange } from "@features/Cart";
import { Button } from "@mui/material";
import { useState } from "react";

interface CartControllerProps {
  addToCartButtonLabel?: string;
  canAddToCart?: boolean;
  onAddToCart?: (quantity: number) => void;
}
export default function CartController({
  addToCartButtonLabel,
  canAddToCart = true,
  onAddToCart,
}: CartControllerProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const onIncrease = () => {
    setQuantity((state) => state + 1);
  };

  const onDecrease = () => {
    setQuantity((state) => (state >= 1 ? state - 1 : 0));
  };

  return (
    <>
      <QuantityChange onIncrease={onIncrease} onDecrease={onDecrease}>
        <div
          style={{
            minWidth: "20px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {quantity}
        </div>
      </QuantityChange>
      <div style={{ display: "flex", marginTop: "16px" }}>
        <Button
          variant="contained"
          style={{
            flexGrow: "1",
          }}
          onClick={() => onAddToCart?.(quantity)}
          disabled={!canAddToCart}
        >
          {addToCartButtonLabel ?? "Add to cart"}
        </Button>
      </div>
    </>
  );
}
