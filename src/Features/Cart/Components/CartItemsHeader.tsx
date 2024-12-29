import CartItemLayout from "./CartItemLayout";

export default function CartItemsHeader() {
  return (
    <CartItemLayout
      className="cart-item-container"
      Price={"Price"}
      ProductDetails={<div style={{ padding: "0 10px" }}>Product details</div>}
      Quantity={"Quantity"}
      TotalPrice={"Total price"}
      Cancel={<div style={{ width: "33px", opacity: "0" }}></div>}
    ></CartItemLayout>
  );
}
