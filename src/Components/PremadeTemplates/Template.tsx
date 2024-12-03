import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TemplateModel } from "../../Models/TemplateModel";
import CategoryTag from "../CategoryTag/CategoryTag";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as FaSolidHeart } from "@fortawesome/free-solid-svg-icons";
import Spacer from "../../Layout/Spacer";
import { useState } from "react";
import { useNotification } from "../../Features/NotificationService/NotificationContext";
import IconButton from "../Button/IconButton";
export default function Template(item: TemplateModel) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { addNotification } = useNotification();

  return (
    <div className="template" style={{ padding: "10px" }}>
      <img className="template-img" src={item.preview} alt="" />
      <Spacer padding={4}>
        <div className="template-name">{item.name}</div>
      </Spacer>

      <Spacer padding={4}>
        <div style={{ fontWeight: "bolder", fontSize: "1.25rem" }}>
          {item.price}$
        </div>
      </Spacer>

      <Spacer padding={4}>
        {item?.tags?.map((item) => (
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
          style={{
            border: "var(--default-border)",
            backgroundColor: "purple",
            color: "white",
          }}
          isActive={false}
        >
          Try this out
        </IconButton>
      </Spacer>
    </div>
  );
}
