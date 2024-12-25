import { useCart } from "../Features/Cart/useCart";

export default function Cart() {
  const { items } = useCart();
  return (
    <div style={{ maxWidth: "1600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Your Cart</h1>
      {items.map((item) => (
        <div>{item.item.name}</div>
      ))}
    </div>
  );
}
