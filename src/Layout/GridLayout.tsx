import { HTMLAttributes } from "react";

interface GridLayoutProps extends HTMLAttributes<HTMLDivElement> {
  cellMinWidth: number;
  gap?: number;
}
export default function GridLayout(props: GridLayoutProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.cellMinWidth}px, 1fr))`,
        // padding: "10px",
      }}
    >
      {props.children}
    </div>
  );
}
