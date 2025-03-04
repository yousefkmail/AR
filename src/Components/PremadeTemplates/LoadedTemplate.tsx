import { DragEvent } from "react";
import DraggableItem from "../DragableItem";
import { TemplateModel } from "../../Core/Models/TemplateModel";
import { v4 as uuidv4 } from "uuid";
import { useUIDraggedWigit } from "@features/DragAndDrop";
import { TemplateObject } from "@core/index";
import WigitCardImage from "@components/WigitCardUI/WigitCardImage";
import Button from "@components/Button/Button";
import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
interface TemplateProps {
  item: TemplateModel;
}

export default function LoadedTemplate({ item }: TemplateProps) {
  const { setDraggedItem } = useUIDraggedWigit();
  const handleDragStart = () => {
    const template: TemplateObject = {
      id: uuidv4(),
      templateModel: {
        ...item,
        pieces: item.pieces.map((item) => ({
          ...item,
          id: uuidv4(),
        })),
      },
      position: [1, 1, 1],
      rotation: [90, 0, 0],
      scale: [1, 1, 1],
    };

    setDraggedItem(template);
  };
  return (
    <DraggableItem
      onDragStart={(event: DragEvent) => {
        const img = new Image();
        img.src = "";
        event.dataTransfer.setDragImage(img, 0, 0);
        handleDragStart();
      }}
    >
      <div
        className="template"
        style={{
          marginBottom: "20px",
          border: "1px solid rgb(238, 238, 238)",
          borderRadius: "7px",
          overflow: "hidden",
        }}
      >
        <WigitCardImage src={item.previewImage} />
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bolder" }}>{item.name}</span>
            <span style={{ color: "#555" }}>
              {GetCurrencyFormat(CalculatePrice(item.price))}
            </span>
          </div>
          <div style={{ padding: "10px 0" }}></div>
          <Button style={{ border: "none" }} disabled={true}>
            Loaded
          </Button>
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
