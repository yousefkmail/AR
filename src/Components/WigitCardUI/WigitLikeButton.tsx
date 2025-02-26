import Button from "@components/Button/Button";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassnameMerge } from "@utils/CssUtils";
import { ButtonHTMLAttributes } from "react";

type LikeButtonProps = {
  isLiked?: boolean;
};
export default function WigitLikeButton({
  isLiked = false,
  className,
  ...rest
}: LikeButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button className={ClassnameMerge("template-like", className)} {...rest}>
      <FontAwesomeIcon
        color={isLiked ? "red" : "black"}
        size="lg"
        className={
          (isLiked === true ? "template-like-pressed" : "") +
          " template-like-icon "
        }
        icon={isLiked ? faSolidHeart : faHeart}
      />
    </Button>
  );
}
