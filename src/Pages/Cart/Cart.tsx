import PageWidthLayout from "@components/Layout/PageWidthLayout";
import { useCart } from "@features/Cart";
import { CartItemList } from "@features/Cart/Components/CartItemList";
import { EmptyCartMessage } from "@features/Cart/Components/EmptyCart";
import { useNavigate } from "react-router-dom";
import CartPiecesContainer from "./CartPiecesContainer";
import CartBottomSection from "./CartBottomSection";

export default function Cart() {
  const {
    items,
    finalProductItems,
    increaseItem,
    decreaseItem,
    removeItem,
    increaseProductItem,
    decreaseProductItem,
    resetPieces,
  } = useCart();

  const navigate = useNavigate();

  const GoToInfoFilling = () => {
    navigate("/info-filling");
  };

  return (
    <PageWidthLayout maxWidth={1600}>
      <div className="cart-container">
        {items.length > 0 ? (
          <>
            <h1 className="cart-header">Your Cart</h1>
            <h2>Collections</h2>
            <CartItemList
              items={items}
              onDecrease={decreaseItem}
              onIncrease={increaseItem}
              onRemove={removeItem}
            />

            <CartPiecesContainer
              items={finalProductItems}
              onDecrease={decreaseProductItem}
              onIncrease={increaseProductItem}
              onResetPieces={() => resetPieces()}
            />

            <CartBottomSection
              productItems={finalProductItems}
              onContinuePressed={GoToInfoFilling}
            />
          </>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </PageWidthLayout>
  );
}
