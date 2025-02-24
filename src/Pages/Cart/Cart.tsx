import PageWidthLayout from "@components/Layout/PageWidthLayout";
import { CartItemList } from "@features/Cart/Components/CartItemList";
import { EmptyCartMessage } from "@features/Cart/Components/EmptyCart";
import { useNavigate } from "react-router-dom";
import CartPiecesContainer from "./CartPiecesContainer";
import CartBottomSection from "./CartBottomSection";
import useCartStore from "@features/Cart/Store/CartStore";
import { useEffect } from "react";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const productItems = useCartStore((state) => state.productItems);
  const decreaseItem = useCartStore((statusbar) => statusbar.decreaseItem);
  const addItem = useCartStore((statusbar) => statusbar.addItem);
  const initializeCart = useCartStore((statusbar) => statusbar.initializeCart);
  const finalProductItems = useCartStore((state) => state.getFinalProductItems);
  const resetPieces = useCartStore((state) => state.resetPieces);
  const removeItem = useCartStore((state) => state.removeItem);
  const removedItems = useCartStore((state) => state.removedItems);
  const increaseProductItem = useCartStore(
    (state) => state.increaseProductItem
  );
  const decreaseProductItem = useCartStore(
    (state) => state.decreaseProductItem
  );

  console.log(productItems);
  console.log(removedItems);
  const navigate = useNavigate();
  useEffect(() => {
    initializeCart();
  }, []);

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
              onDecrease={(item) => {
                decreaseItem({ item, quantity: 1 });
              }}
              onIncrease={(item) => {
                addItem({ item, quantity: 1 });
              }}
              onRemove={(item) => removeItem({ item, quantity: 0 })}
            />

            <CartPiecesContainer
              items={finalProductItems()}
              onDecrease={(item) => decreaseProductItem({ item, quantity: 1 })}
              onIncrease={(item) => increaseProductItem({ item, quantity: 1 })}
              onResetPieces={() => resetPieces()}
            />

            <CartBottomSection
              productItems={productItems}
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
