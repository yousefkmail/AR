import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FontawesomeIconButton from "../../../Components/Button/FontawesomeIconButton";
import { CartItemProps } from "./CartItem";
import QuantityChange from "./QuantityChange";

export default function CartItemMobile({
  name,
  price,
  quantity,
  totalPrice,
  previewImage,
  onIncrease,
  onDecrease,
  onRemove,
  className,
  style,
}: CartItemProps) {
  return (
    <div className={className} style={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p>{name}</p>
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
        </div>

        <FontawesomeIconButton
          size="lg"
          onClick={() => onRemove?.()}
          icon={faXmark}
          isActive={false}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Price:</p>
        <p style={{ padding: "7px" }}>{price}$</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Quantity:</p>
        <QuantityChange
          onIncrease={() => onIncrease?.()}
          onDecrease={() => onDecrease?.()}
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
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Total price:</p>
        <p style={{ padding: "7px" }}>{totalPrice}$</p>
      </div>
    </div>
  );
}
