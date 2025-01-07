import { HTMLAttributes } from "react";
import CartItemLayout from "./CartItemLayout";
import QuantityChange from "./QuantityChange";
import FontawesomeIconButton from "../../../Components/Button/FontawesomeIconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface CartItemProps extends HTMLAttributes<HTMLDivElement> {
  quantity: number;
  id: string;
  name: string;
  previewImage: string;
  totalPrice?: number;
  price: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

export default function CartItem({
  previewImage,
  id,
  name,
  quantity,
  totalPrice,
  price,
  className,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <CartItemLayout
      className={className}
      Price={<div style={{ fontWeight: "bold" }}>{price}$</div>}
      ProductDetails={
        <div style={{ display: "flex", flexWrap: "wrap", padding: "0 10px" }}>
          {previewImage && (
            <img
              style={{
                width: "100px",
                aspectRatio: "1/1",
                objectFit: "contain",
                marginRight: "10px",
              }}
              src={previewImage}
            />
          )}
          <div
            style={{
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
          onIncrease={() => onIncrease?.()}
          onDecrease={() => onDecrease?.()}
          canDecrease={quantity > 0}
        >
          <span
            style={{
              fontSize: "1.125rem",
              margin: "0 5px",
              display: "inline-block",
              minWidth: "20px",
              textAlign: "center",
            }}
          >
            {quantity}
          </span>
        </QuantityChange>
      }
      TotalPrice={<div style={{ fontWeight: "bold" }}>{totalPrice}$</div>}
      key={id}
      Cancel={
        <FontawesomeIconButton
          onClick={() => onRemove?.()}
          size="lg"
          icon={faXmark}
          isActive={false}
        />
      }
    ></CartItemLayout>
  );
}
