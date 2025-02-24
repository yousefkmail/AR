import { ButtonHTMLAttributes } from "react";
import { ClassnameMerge } from "../../Utils/CssUtils";

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
