import { HTMLAttributes } from "react";
import CartItemLayout from "./CartItemLayout";
import QuantityChange from "./QuantityChange";
import { useCart } from "../useCart";

interface CartItemProps extends HTMLAttributes<HTMLDivElement> {
  quantity: number;
  id: string;
  name: string;
  previewImage: string;
  totalPrice?: number;
  price: number;
}

export default function CartItem({
  previewImage,
  id,
  name,
  quantity,
  totalPrice,
  price,
  className,
}: CartItemProps) {
  const { increaseItem, decreaseItem } = useCart();
  return (
    <CartItemLayout
      className={className}
      Price={`${price}$`}
      ProductDetails={
        <div style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}>
          <img
            style={{ width: "100px", aspectRatio: "1/1", objectFit: "contain" }}
            src={previewImage}
          />
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {name}
          </div>
        </div>
      }
      Quantity={
        <QuantityChange
          onIncrease={() =>
            increaseItem({
              id: id,
              description: "",
              name: name,
              previewImage: previewImage,
              price,
            })
          }
          onDecrease={() =>
            decreaseItem({
              id: id,
              description: "",
              name: name,
              previewImage: previewImage,
              price,
            })
          }
          canDecrease={quantity > 0}
        >
          {quantity}
        </QuantityChange>
      }
      TotalPrice={`${totalPrice}$`}
      key={id}
    ></CartItemLayout>
  );
}
