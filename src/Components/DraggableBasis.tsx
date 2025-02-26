import { HTMLAttributes } from "react";
import DraggableItem from "./DragableItem";
import { Plane } from "@core/index";
import WigitCardImage from "./WigitCardUI/WigitCardImage";
import WigitCardTextField from "./WigitCardUI/WigitCardTextField";
import WigitCartPriceField from "./WigitCardUI/WigitCartPriceField";
import WigitsCardDimentionsField from "./WigitCardUI/WigitsCardDimentionsField";
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
          }}
        >
          <WigitCardTextField label="Name" text={name} />
          <WigitCartPriceField price={price} />
          <WigitsCardDimentionsField height={height} width={width} />
          <WigitCardTextField label="Stock" text={stock.toString()} />
        </div>
      </div>
    </DraggableItem>
  );
}
