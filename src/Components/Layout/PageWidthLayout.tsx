import { ClassnameMerge } from "@utils/CssUtils";
import { HTMLAttributes } from "react";

interface PageWidthLayoutProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth: number;
}

export default function PageWidthLayout(props: PageWidthLayoutProps) {
  return (
    <div
      style={{
        maxWidth: props.maxWidth + "px",
        ...props.style,
      }}
      className={ClassnameMerge("page-width-layout", props.className)}
    >
      {props.children}
    </div>
  );
}
