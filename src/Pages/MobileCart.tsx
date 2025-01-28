import { useCart } from "../Features/Cart/useCart";
import PageWidthLayout from "../Layout/PageWidthLayout";
import CartItemMobile from "../Features/Cart/Components/CartItemMobile";

export default function MobileCart() {
  const {
    items,
    productItems,
    increaseItem,
    decreaseItem,
    removeItem,
    increaseProductItem,
    decreaseProductItem,
    resetPieces,
  } = useCart();

  return (
    <PageWidthLayout className="mobile-cart" maxWidth={1600}>
      {items.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center" }}>Your Cart</h1>
          <h2>Collections</h2>
          <div className="cart-items">
            {items.map((item) => (
              <CartItemMobile
                onIncrease={() => increaseItem(item.item)}
                onDecrease={() => decreaseItem(item.item)}
                onRemove={() => removeItem(item.item)}
                className="cart-item-container cart-item-container-mobile"
                quantity={item.quantity}
                {...item.item}
                totalPrice={parseFloat(
                  (item.item.price * item.quantity).toFixed(2)
                )}
                price={parseFloat(item.item.price.toFixed(2))}
                key={item.item.id}
              ></CartItemMobile>
            ))}
          </div>
          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Total pieces</h2>
              <button
                onClick={() => resetPieces()}
                className="btn-sec-color"
                style={{
                  padding: "10px",
                  border: "var(--secondary-border)",
                  borderRadius: "5px",
                }}
              >
                Reset pieces
              </button>
            </div>

            <div className="cart-items">
              {productItems?.map((item) => {
                return (
                  <CartItemMobile
                    onIncrease={() => increaseProductItem(item.item)}
                    onDecrease={() => decreaseProductItem(item.item)}
                    className="cart-item-container cart-item-container-mobile"
                    {...item.item}
                    quantity={item.quantity}
                    totalPrice={parseFloat(
                      (item.item.price * item.quantity).toFixed(2)
                    )}
                    key={item.item.id}
                  ></CartItemMobile>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div
              style={{ marginTop: "30px", flexGrow: "1", maxWidth: "500px" }}
            >
              <h2>Summary</h2>
              <div className="cart-items">
                <div
                  style={{
                    maxWidth: "800px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <span>Total pieces</span>
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    {productItems?.reduce(
                      (prev, next) => prev + next.quantity,
                      0
                    )}
                  </span>
                </div>
                <div
                  style={{
                    maxWidth: "800px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <span>Subtotal</span>
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    {productItems &&
                      productItems.reduce(
                        (prev, next) => prev + next.quantity * next.item.price,
                        0
                      ) / 100}
                    $
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => resetPieces()}
              className="btn-sec-color"
              style={{
                padding: "15px",
                border: "var(--secondary-border)",
                borderRadius: "5px",
              }}
            >
              CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxWidth: " min(500px,100%)",
                aspectRatio: "1/1",
              }}
              src="./3-2-cart-png-hd.png"
            />
          </div>
          <h1 style={{ textAlign: "center" }}>
            You don't have any items in your cart.
          </h1>

          <h3 style={{ textAlign: "center" }}>
            Start by building your collection and add it to your cart.
          </h3>
        </>
      )}
    </PageWidthLayout>
  );
}
