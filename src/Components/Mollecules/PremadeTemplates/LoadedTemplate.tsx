import { DragEvent } from "react";
import { TemplateModel } from "../../../Core/Models/TemplateModel";
import { v4 as uuidv4 } from "uuid";
import { useUIDraggedWigit } from "@features/DragAndDrop";
import { TemplateObject } from "@core/index";
import WigitCardImage from "@components/Mollecules/WigitCardUI/WigitCardImage";
import { Typography } from "@mui/material";

import { CalculatePrice, GetCurrencyFormat } from "@utils/CurrencyUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CartController from "../CartController";
import { useAddItemToCart } from "@hooks/useAddItemToCart";
interface TemplateProps {
  item: TemplateModel;
}

export default function LoadedTemplate({ item }: TemplateProps) {
  const { setDraggedItem } = useUIDraggedWigit();
  const { addItemWithNotification } = useAddItemToCart();
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
          <div style={{ paddingTop: "8px" }}>
            <CartController
              onAddToCart={(count) =>
                addItemWithNotification({
                  item,
                  quantity: count,
                  type: "collection",
                })
              }
            ></CartController>
          </div>
        </div>
      </div>
    </div>
  );
}
