import { HTMLAttributes } from "react";
import DraggableItem from "./DragableItem";
import { Plane } from "@core/index";
import WigitCardImage from "./WigitCardUI/WigitCardImage";
import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
import Button from "./Button/Button";
interface DraggablebasisProps extends HTMLAttributes<HTMLDivElement> {
  plane: Plane;
}

export default function DraggableBasis({
  plane,
  ...rest
}: DraggablebasisProps) {
  const { previewImage, width, height, stock, price, name } = plane;
  return (
    <DraggableItem {...rest}>
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
        <WigitCardImage className="drag-image-inner" src={previewImage} />

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span> {width} </span>
              <span> X </span>
              <span> {height} </span>
              <span
                style={{
                  borderRadius: "3px",
                  marginLeft: "3px",
                }}
              >
                {"cm"}
              </span>
            </div>
          </div>

          <div style={{ color: "rgb(128, 9, 9)" }}>
            <span> {stock}</span>
            <span>{" in stock"}</span>
          </div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <Button
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                border: "none",
                flexGrow: "1",
              }}
            >
              {"Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </DraggableItem>
  );
}
