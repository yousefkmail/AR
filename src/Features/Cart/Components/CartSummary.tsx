import { ProductItem } from "@data/ProductItem";
import { CartItemType } from "@features/Cart";
import { CalculatePrice, To2DigitFixed } from "@utils/CurrencyUtils";
import { HTMLAttributes } from "react";

interface CartSummaryProps extends HTMLAttributes<HTMLDivElement> {
  productItems: CartItemType<ProductItem>[];
}
export const CartSummary = ({ productItems, className }: CartSummaryProps) => {
  const totalPieces = productItems.reduce(
    (prev, next) => prev + next.quantity,
    0
  );
  const totalCost = To2DigitFixed(
    productItems.reduce(
      (prev, next) => prev + CalculatePrice(next.item.price, next.quantity),
      0
    )
  );

  return (
    <div className={className}>
      <h2>Summary</h2>
      <div className="cart-items">
        <div className="summary-row">
          <span>Total pieces</span>
          <span className="summary-value">{totalPieces}</span>
        </div>
        <div className="summary-row">
          <span>Pieces cost</span>
          <span className="summary-value">${totalCost}</span>
        </div>
      </div>
    </div>
  );
};
