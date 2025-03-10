import { ClassnameMerge } from "@utils/CssUtils";
import { ButtonHTMLAttributes } from "react";

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
    <button {...rest} className={ClassnameMerge(GetClass(isActive), className)}>
      {children}
    </button>
  );
}
