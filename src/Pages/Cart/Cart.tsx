import PageWidthLayout from "@components/Layout/PageWidthLayout";
import { CartItemList } from "@features/Cart/Components/CartItemList";
import { EmptyCartMessage } from "@features/Cart/Components/EmptyCart";
import { useNavigate } from "react-router-dom";
import CartPiecesContainer from "./CartPiecesContainer";
import CartBottomSection from "./CartBottomSection";
import useCartStore from "@features/Cart/Store/CartStore";
import { useEffect } from "react";
import { IncrementalArray } from "@utils/IncrementalArray";
import { CartItemType } from "@features/Cart";
import { ProductItem } from "@data/ProductItem";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const productItems = useCartStore((state) => state.productItems);
  const removedItems = useCartStore((state) => state.removedItems);
  const decreaseItem = useCartStore((statusbar) => statusbar.decreaseItem);
  const addItem = useCartStore((statusbar) => statusbar.addItem);
  const initializeCart = useCartStore((statusbar) => statusbar.initializeCart);
  const resetPieces = useCartStore((state) => state.resetPieces);
  const removeItem = useCartStore((state) => state.removeItem);

  const increaseProductItem = useCartStore(
    (state) => state.increaseProductItem
  );
  const decreaseProductItem = useCartStore(
    (state) => state.decreaseProductItem
  );

  const navigate = useNavigate();
  useEffect(() => {
    initializeCart();
  }, []);

  const GoToInfoFilling = () => {
    navigate("/info-filling");
  };

  const finalProductItems = () => {
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(
        (a, b) => a.item.id === b.item.id
      );
    for (let productItem of productItems) {
      updatedProductItems.addItem(productItem);
    }

    for (let removedItem of removedItems) {
      updatedProductItems.removeQuantity(removedItem);
    }

    return updatedProductItems.getItems();
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
              productItems={finalProductItems()}
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
