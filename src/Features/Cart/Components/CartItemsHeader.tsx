import CartItemLayout from "./CartItemLayout";

export default function CartItemsHeader() {
  return (
    <CartItemLayout
      className="cart-item-container"
      Price={"Price"}
      ProductDetails={"Product details"}
      Quantity={"Quantity"}
      TotalPrice={"Total price"}
    ></CartItemLayout>
  );
}
