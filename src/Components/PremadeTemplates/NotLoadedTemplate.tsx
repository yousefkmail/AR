import { DragEvent } from "react";
import DraggableItem from "../DragableItem";
import { CircularProgress } from "@mui/material";
import { UnresolvedTemplateModel } from "../../Core/Models/TemplateModel";
import { useAddNotification } from "@features/NotificationService/useAddNotification";
import WigitCardImage from "@components/WigitCardUI/WigitCardImage";
import Button from "@components/Button/Button";
import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
interface TemplateProps {
  item: UnresolvedTemplateModel;
  isLoading: boolean;
  OnLoadPresed: () => void;
}

export default function NotLoadedTemplate({
  item,
  OnLoadPresed,
  isLoading,
}: TemplateProps) {
  const addNotification = useAddNotification();
  const handleDragStart = () => {
    addNotification(
      `you need to load template ${item.name} before dragging it.`,
      "warning"
    );
    return;
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
          <div style={{ display: "flex" }}>
            <Button
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                border: "none",
                flexGrow: "1",
              }}
              disabled={isLoading}
              onClick={() => OnLoadPresed?.()}
            >
              {isLoading ? (
                <CircularProgress
                  size={"10px"}
                  sx={{ color: "black" }}
                ></CircularProgress>
              ) : (
                "Load template"
              )}
            </Button>
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
