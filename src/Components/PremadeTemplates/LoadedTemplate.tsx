import { DragEvent } from "react";
import { TemplateModel } from "../../Core/Models/TemplateModel";
import { v4 as uuidv4 } from "uuid";
import { useUIDraggedWigit } from "@features/DragAndDrop";
import { TemplateObject } from "@core/index";
import WigitCardImage from "@components/WigitCardUI/WigitCardImage";
import { Button, Typography } from "@mui/material";

import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { QuantityChange } from "@features/Cart";
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

          <Typography color="success">
            {"Loaded "}
            <FontAwesomeIcon icon={faCheck} />
          </Typography>

          <QuantityChange>
            <div
              style={{
                minWidth: "20px",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              1
            </div>
          </QuantityChange>

          <div style={{ display: "flex", marginTop: "16px" }}>
            <Button
              style={{
                flexGrow: "1",
              }}
              variant="contained"
            >
              {"Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
