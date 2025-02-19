import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as FaSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { DragEvent, useState } from "react";
import IconButton from "../Button/IconButton";
import DraggableItem from "../DragableItem";
import { CircularProgress } from "@mui/material";
import { UnresolvedTemplateModel } from "../../Core/Models/TemplateModel";
import Spacer from "@components/Layout/Spacer";
import { useAddNotification } from "@features/NotificationService/useAddNotification";
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
  const [isLiked, setIsLiked] = useState<boolean>(false);
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
      <div className="template" style={{ padding: "10px" }}>
        <img
          draggable={false}
          className="template-img"
          src={item.previewImage}
          alt=""
        />
        <Spacer padding={4}>
          <div className="template-name">{item.name}</div>
        </Spacer>

        <Spacer padding={4}>
          <div style={{ fontWeight: "bolder", fontSize: "1.25rem" }}>
            {item.price / 100}$
          </div>
        </Spacer>

        {/* <Spacer padding={4}>
          {item?.template.tags?.map((item) => (
            <CategoryTag>{item}</CategoryTag>
          ))}
        </Spacer> */}

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
            disabled={isLoading}
            onClick={() => OnLoadPresed?.()}
            isActive={false}
          >
            {isLoading ? (
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
