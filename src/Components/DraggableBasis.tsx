import { HTMLAttributes } from "react";
import DraggableItem from "./DragableItem";
import { Plane } from "@core/index";
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
      <div className="drag-image-inner">
        <div style={{ width: "100%", height: "120px" }}>
          <img
            loading="lazy"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "#eee",
              borderRadius: "10px",
              padding: "5px",
            }}
            src={previewImage}
            alt=""
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
            fontSize: "0.875em",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "7px 0",
            }}
          >
            <div style={{ fontWeight: "bolder" }}>name</div>
            <div>
              <span>{name}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "7px 0",
            }}
          >
            <div style={{ fontWeight: "bolder" }}>Price</div>
            <div style={{ fontSize: "1em", fontWeight: "bolder" }}>
              {price / 100}$
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "7px 0",
            }}
          >
            <div style={{ fontWeight: "bolder" }}>Size</div>
            <div>
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
                  cm
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "7px 0",
            }}
          >
            <div style={{ fontWeight: "bolder" }}>Stock</div>
            <div>{stock}</div>
          </div>
        </div>
      </div>
    </DraggableItem>
  );
}
