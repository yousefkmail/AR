import { HTMLAttributes } from "react";

interface PageWidthLayoutProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth: number;
}

export default function PageWidthLayout(props: PageWidthLayoutProps) {
  return (
    <div
      style={{
        maxWidth: props.maxWidth + "px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {props.children}
    </div>
  );
}
