import CartItem from "../Features/Cart/Components/CartItem";
import CartItemsHeader from "../Features/Cart/Components/CartItemsHeader";
import { useCart } from "../Features/Cart/useCart";
import PageWidthLayout from "../Layout/PageWidthLayout";
import { useNavigate } from "react-router-dom";
import {
  CalculatePrice,
  MinimumPriceUnitToUSD,
  To2DigitFixed,
} from "../Utils/CurrencyUtils";

export default function DesktopCart() {
  const {
    items,
    piecesItems,
    basesItems,
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
    <PageWidthLayout className="desktop-cart" maxWidth={1600}>
      <div style={{ marginBottom: "20px" }}>
        {items.length > 0 ? (
          <>
            <h1 style={{ textAlign: "center" }}>Your Cart</h1>

            <h2>Collections</h2>
            <div className="cart-items">
              <CartItemsHeader />
              {items.map((item) => (
                <CartItem
                  onIncrease={() => increaseItem(item.item)}
                  onDecrease={() => decreaseItem(item.item)}
                  onRemove={() => removeItem(item.item)}
                  className="cart-item-container"
                  quantity={item.quantity}
                  {...item.item}
                  price={MinimumPriceUnitToUSD(item.item.price)}
                  totalPrice={CalculatePrice(item.quantity, item.item.price)}
                  key={item.item.id}
                ></CartItem>
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
                <CartItemsHeader />
                {piecesItems?.map((item) => {
                  return (
                    <CartItem
                      onIncrease={() => increaseProductItem(item.item)}
                      onDecrease={() => decreaseProductItem(item.item)}
                      className="cart-item-container"
                      {...item.item}
                      quantity={item.quantity}
                      price={MinimumPriceUnitToUSD(item.item.price)}
                      totalPrice={CalculatePrice(
                        item.item.price,
                        item.quantity
                      )}
                      key={item.item.id}
                    ></CartItem>
                  );
                })}
                {basesItems?.map((item) => {
                  return (
                    <CartItem
                      onIncrease={() => increaseProductItem(item.item)}
                      onDecrease={() => decreaseProductItem(item.item)}
                      className="cart-item-container"
                      {...item.item}
                      quantity={item.quantity}
                      price={MinimumPriceUnitToUSD(item.item.price)}
                      totalPrice={CalculatePrice(
                        item.item.price,
                        item.quantity
                      )}
                      key={item.item.id}
                    ></CartItem>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
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
                      {(piecesItems?.reduce(
                        (prev, next) => prev + next.quantity,
                        0
                      ) ?? 0) +
                        (basesItems?.reduce(
                          (prev, next) => prev + next.quantity,
                          0
                        ) ?? 0)}
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
                    <span>Pieces cost</span>
                    <span
                      style={{
                        display: "inline-block",
                        minWidth: "50px",
                        fontWeight: "bold",
                      }}
                    >
                      $
                      {To2DigitFixed(
                        ((piecesItems &&
                          piecesItems.reduce(
                            (prev, next) =>
                              prev +
                              CalculatePrice(next.item.price, next.quantity),
                            0
                          )) ??
                          0) +
                          ((basesItems &&
                            basesItems.reduce(
                              (prev, next) =>
                                prev +
                                CalculatePrice(next.item.price, next.quantity),
                              0
                            )) ??
                            0)
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  GoToInfoFilling();
                }}
                className="btn-sec-color"
                style={{
                  padding: "15px",
                  border: "var(--secondary-border)",
                  borderRadius: "5px",
                  marginLeft: "20px",
                }}
              >
                Continue
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
      </div>
    </PageWidthLayout>
  );
}
