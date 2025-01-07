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
        margin: "auto",
        padding: "0 16px",
        boxSizing: "border-box",
        ...props.style,
      }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
