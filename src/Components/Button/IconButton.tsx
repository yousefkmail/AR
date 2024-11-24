import React, { HTMLAttributes } from "react";
import { ClassnameMerge } from "../../Utils/CssUtils";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const GetClass = (isActive: boolean) => {
  if (isActive) return "windowsbar-button windowsbar-button-active";
  return "windowsbar-button";
};
export default function IconButton({
  onClick,
  children,
  className,
  isActive,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={ClassnameMerge(GetClass(isActive), className)}
    >
      {children}
    </button>
  );
}
