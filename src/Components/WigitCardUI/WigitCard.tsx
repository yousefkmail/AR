import { HTMLAttributes } from "react";
import { Plane } from "@core/index";
import WigitCardImage from "./WigitCardImage";
import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
import Size from "./Size";
import Stock from "./Stock";
import CartController from "@components/Mollecules/CartController";
interface DraggablebasisProps extends HTMLAttributes<HTMLDivElement> {
  plane: Plane;
}

export default function WigitCard({
  plane,
  onDragStart,
  onClick,
  ...rest
}: DraggablebasisProps) {
  const { previewImage, width, height, stock, price, name } = plane;
  return (
    <div {...rest}>
      <div
        style={{
          paddingBottom: "10px",
          marginTop: "10px",
          lineHeight: "1.5rem",
          border: "1px solid rgb(238, 238, 238)",
          borderRadius: "7px",
          overflow: "hidden",
        }}
      >
        <div draggable onDragStart={onDragStart} onClick={onClick}>
          <WigitCardImage className="drag-image-inner" src={previewImage} />
        </div>

        <div
          style={{
            padding: "10px",
            lineHeight: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bolder" }}>{name}</span>
            <span style={{ color: "#555" }}>
              {GetCurrencyFormat(CalculatePrice(price))}
            </span>
          </div>

          <Size height={height} width={width} />
          <Stock stock={stock} />

          <CartController></CartController>
        </div>
      </div>
    </div>
  );
}
