import PageWidthLayout from "@components/Layout/PageWidthLayout";
import { CartItemList } from "@features/Cart/Components/CartItemList";
import { EmptyCartMessage } from "@features/Cart/Components/EmptyCart";
import { useNavigate } from "react-router-dom";
import CartBottomSection from "./CartBottomSection";
import useCartStore from "@features/Cart/Store/CartStore";
import { useEffect } from "react";
import { IncrementalArray } from "@utils/IncrementalArray";
import { CartItemType } from "@features/Cart";
import { ProductItem } from "@data/ProductItem";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const productItems = useCartStore((state) => state.productItems);
  const decreaseItem = useCartStore((statusbar) => statusbar.decreaseItem);
  const addItem = useCartStore((statusbar) => statusbar.addItem);
  const initializeCart = useCartStore((statusbar) => statusbar.initializeCart);
  const removeItem = useCartStore((state) => state.removeItem);

  const navigate = useNavigate();
  useEffect(() => {
    initializeCart();
  }, []);

  const GoToInfoFilling = () => {
    navigate("/info-filling");
  };

  console.log(items);

  const finalProductItems = () => {
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(
        (a, b) => a.item.id === b.item.id
      );
    for (let productItem of productItems) {
      updatedProductItems.addItem(productItem);
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
                decreaseItem({ item, quantity: 1, type: "base" });
              }}
              onIncrease={(item) => {
                addItem({ item, quantity: 1, type: "base" });
              }}
              onRemove={(item) =>
                removeItem({ item, quantity: 0, type: "base" })
              }
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
