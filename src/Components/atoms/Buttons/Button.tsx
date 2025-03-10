import { ClassnameMerge } from "@utils/CssUtils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={ClassnameMerge("btn-color", "btn-shape", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
