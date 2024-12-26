import CartItem from "../Features/Cart/Components/CartItem";
import CartItemsHeader from "../Features/Cart/Components/CartItemsHeader";
import { useCart } from "../Features/Cart/useCart";

export default function Cart() {
  const { items } = useCart();
  return (
    <div style={{ maxWidth: "1600px", margin: "auto", padding: " 0 48px" }}>
      <h1 style={{ textAlign: "center" }}>Your Cart</h1>
      <div className="cart-items">
        <CartItemsHeader />
        {items.map((item) => (
          <CartItem
            className="cart-item-container"
            quantity={item.quantity}
            {...item.item}
            totalPrice={item.item.price * item.quantity}
            key={item.item.id}
          ></CartItem>
        ))}
      </div>
    </div>
  );
}
