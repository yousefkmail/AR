import { ButtonHTMLAttributes } from "react";
import { ClassnameMerge } from "../../Utils/CssUtils";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const GetClass = (isActive: boolean) => {
  if (isActive) return "windowsbar-button windowsbar-button-active";
  return "windowsbar-button";
};
export default function IconButton({
  children,
  className,
  isActive,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      className={ClassnameMerge("btn-color", GetClass(isActive), className)}
    >
      {children}
    </button>
  );
}
