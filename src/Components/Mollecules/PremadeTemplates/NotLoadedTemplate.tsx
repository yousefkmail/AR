import { DragEvent } from "react";
import { CircularProgress } from "@mui/material";
import { UnresolvedTemplateModel } from "../../../Core/Models/TemplateModel";
import { useAddNotification } from "@features/NotificationService/useAddNotification";
import WigitCardImage from "@components/Mollecules/WigitCardUI/WigitCardImage";
import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
import { Button } from "@mui/material";
import CartController from "../CartController";
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
    <div>
      <div
        className="template"
        style={{
          marginBottom: "20px",
          border: "1px solid rgb(238, 238, 238)",
          borderRadius: "7px",
          overflow: "hidden",
        }}
      >
        <div
          draggable
          onDragStart={(event: DragEvent) => {
            const img = new Image();
            img.src = "";
            event.dataTransfer.setDragImage(img, 0, 0);
            handleDragStart();
          }}
        >
          <WigitCardImage src={item.previewImage} />
        </div>

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
                flexGrow: "1",
              }}
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={() => OnLoadPresed?.()}
            >
              {isLoading ? (
                <CircularProgress
                  size={"24px"}
                  sx={{ color: "black" }}
                ></CircularProgress>
              ) : (
                "Load template"
              )}
            </Button>
          </div>
          <div style={{ paddingTop: "8px" }}>
            <CartController></CartController>
          </div>
        </div>
      </div>
    </div>
  );
}
