import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryTag from "../CategoryTag/CategoryTag";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as FaSolidHeart } from "@fortawesome/free-solid-svg-icons";
import Spacer from "../../Layout/Spacer";
import { DragEvent, useContext, useState } from "react";
import { useNotification } from "../../Features/NotificationService/NotificationContext";
import IconButton from "../Button/IconButton";
import DraggableItem from "../DragableItem";
import { DraggedPieceContext } from "../../Context/DraggedPieceContext";
import { CircularProgress } from "@mui/material";
import {
  LoadableTemplate,
  TemplateState,
} from "../../Interfaces/LoadableTemplate";
import { TemplateModel } from "../../DataService/Models/TemplateModel";
import { TemplateObject } from "../../Core/Template";
import { v4 as uuidv4 } from "uuid";
interface TemplateProps {
  item: LoadableTemplate;
  OnLoadPresed: () => void;
}

export default function Template({ item, OnLoadPresed }: TemplateProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { addNotification } = useNotification();
  const { setDraggedItem } = useContext(DraggedPieceContext);
  const handleDragStart = () => {
    if (!(item.state === TemplateState.Loaded)) {
      addNotification(
        `you need to load template ${item.template.name} before dragging it.`,
        "warning"
      );

      return;
    }

    const template: TemplateObject = {
      id: uuidv4(),
      templateModel: { ...(item.template as TemplateModel) },
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
      <div className="template" style={{ padding: "10px" }}>
        <img
          draggable={false}
          className="template-img"
          src={item.template.previewImage}
          alt=""
        />
        <Spacer padding={4}>
          <div className="template-name">{item.template.name}</div>
        </Spacer>

        <Spacer padding={4}>
          <div style={{ fontWeight: "bolder", fontSize: "1.25rem" }}>
            {item.template.price / 100}$
          </div>
        </Spacer>

        <Spacer padding={4}>
          {item?.template.tags?.map((item) => (
            <CategoryTag>{item}</CategoryTag>
          ))}
        </Spacer>

        <Spacer padding={4}>
          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                addNotification(
                  isLiked
                    ? "Item has been removed from your favorite"
                    : "Item has been added from your favorite",
                  "info"
                );

                setIsLiked(!isLiked);
              }}
              className="template-like"
            >
              <FontAwesomeIcon
                color={isLiked ? "red" : "black"}
                size="xl"
                className={
                  (isLiked === true ? "template-like-pressed" : "") +
                  " template-like-icon "
                }
                style={{ filter: "none" }}
                icon={isLiked ? FaSolidHeart : faHeart}
              />
            </button>
          </div>
        </Spacer>
        <Spacer padding={4}>
          <IconButton
            draggable={false}
            style={{
              border: "var(--default-border)",
              backgroundColor: "black",
              color: "white",
            }}
            disabled={item.state !== TemplateState.NotLoaded}
            onClick={() => OnLoadPresed?.()}
            isActive={false}
          >
            {item.state === TemplateState.Loaded ? (
              "Loaded"
            ) : item.state === TemplateState.Loading ? (
              <CircularProgress
                size={"10px"}
                sx={{ color: "white" }}
              ></CircularProgress>
            ) : (
              "Load template"
            )}
          </IconButton>
        </Spacer>
      </div>
    </DraggableItem>
  );
}
