import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as FaSolidHeart } from "@fortawesome/free-solid-svg-icons";
import Spacer from "../../Layout/Spacer";
import { DragEvent, useState } from "react";
import { useNotification } from "../../Features/NotificationService/NotificationContext";
import IconButton from "../Button/IconButton";
import DraggableItem from "../DragableItem";
import { TemplateModel } from "../../Data/Models/TemplateModel";
import { TemplateObject } from "../../Data/R3F/Template";
import { v4 as uuidv4 } from "uuid";
import { useUIDraggedWigit } from "@features/DragAndDrop";
interface TemplateProps {
  item: TemplateModel;
}

export default function LoadedTemplate({ item }: TemplateProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { addNotification } = useNotification();
  const { setDraggedItem } = useUIDraggedWigit();
  const handleDragStart = () => {
    const template: TemplateObject = {
      id: uuidv4(),
      templateModel: {
        ...item,
        children: item.children.map((item) => ({
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
            disabled={true}
            isActive={false}
          >
            {"Loaded"}
          </IconButton>
        </Spacer>
      </div>
    </DraggableItem>
  );
}
