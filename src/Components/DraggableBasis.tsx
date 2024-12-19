import { HTMLAttributes } from "react";
import DraggableItem from "./DragableItem";
import Spacer from "../Layout/Spacer";
interface DraggablebasisProps extends HTMLAttributes<HTMLDivElement> {
  texture: string;
  name: string;
  price: number;
  width: number;
  height: number;
}

export default function DraggableBasis({
  texture,
  height,
  name,
  price,
  width,
  ...rest
}: DraggablebasisProps) {
  return (
    <DraggableItem {...rest}>
      <div className="drag-image-inner">
        <img
          // className="piece-card-image"
          draggable={false}
          style={{
            width: "100%",
            height: "120px",
            aspectRatio: "5/1",
            objectFit: "contain",
            backgroundColor: "#eee",
            borderRadius: "10px",

            padding: "5px",
          }}
          src={texture}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <div
            style={{
              marginBottom: "7px",
            }}
          >
            <span style={{ fontWeight: "bolder" }}>{name}</span>
          </div>

          <Spacer padding={4}>
            <div style={{ fontWeight: "bolder", fontSize: "1.25rem" }}>
              {price}$
            </div>
          </Spacer>
          <div>
            <span> Size: </span>
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
    </DraggableItem>
  );
}
