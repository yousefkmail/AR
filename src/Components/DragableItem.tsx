import { HTMLAttributes } from "react";

interface DragableItemProps extends HTMLAttributes<HTMLDivElement> {
  OnDragStart?: () => void;
  data: any;
}
export default function DraggableItem({
  OnDragStart,
  data,
  children,
  ...rest
}: DragableItemProps) {
  return (
    <div
      draggable
      {...rest}
      style={{
        backgroundColor: "white",
        padding: "10px",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
