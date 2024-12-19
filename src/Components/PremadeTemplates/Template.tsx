import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryTag from "../CategoryTag/CategoryTag";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as FaSolidHeart } from "@fortawesome/free-solid-svg-icons";
import Spacer from "../../Layout/Spacer";
import { DragEvent, useContext, useState } from "react";
import { useNotification } from "../../Features/NotificationService/NotificationContext";
import IconButton from "../Button/IconButton";
import {
  LoadableTemplate,
  useTemplatesQuery,
} from "../../Hooks/useTemplatesQuery";
import DraggableItem from "../DragableItem";
import { BasisPlaneViewModel } from "../../Core/Viewmodels/BasisPlaneViewModel";
import { BasisPlane } from "../../Core/BasisPlane";
import { v4 as uuidv4 } from "uuid";
import { DraggedPieceContext } from "../../Context/DraggedPieceContext";
import { PiecePlaneViewModel } from "../../Core/Viewmodels/PiecePlaneViewModel";
import { PiecePlane } from "../../Core/PiecePlane";
import { CircularProgress } from "@mui/material";

export default function Template(item: LoadableTemplate) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { addNotification } = useNotification();
  const { fetchFullTemplate } = useTemplatesQuery();
  const { setDraggedItem } = useContext(DraggedPieceContext);
  const handleDragStart = () => {
    if (!item.template.loadedData) {
      addNotification(
        `you need to load template ${item.template.name} before dragging it.`,
        "warning"
      );

      return;
    }
    const TemplateViewModel = new BasisPlaneViewModel(
      new BasisPlane(item.template.loadedData.basis, uuidv4())
    );

    for (const child of item.template.loadedData.children) {
      TemplateViewModel.addChild(
        new PiecePlaneViewModel(new PiecePlane({ ...child.data }, uuidv4())),
        child.layer,
        child.position[0]
      );
    }

    setDraggedItem(TemplateViewModel);
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
          src={item.template.preview}
          alt=""
        />
        <Spacer padding={4}>
          <div className="template-name">{item.template.name}</div>
        </Spacer>

        <Spacer padding={4}>
          <div style={{ fontWeight: "bolder", fontSize: "1.25rem" }}>
            {item.template.price}$
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
            disabled={item.template.loadedData !== undefined}
            onClick={() => fetchFullTemplate(item.template.assetId)}
            isActive={false}
          >
            {item.template.loadedData ? (
              "Loaded"
            ) : item.isLoading ? (
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
