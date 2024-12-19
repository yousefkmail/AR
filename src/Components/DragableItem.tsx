import { HTMLAttributes } from "react";

interface DragableItemProps extends HTMLAttributes<HTMLDivElement> {
  OnDragStart?: () => void;
}
export default function DraggableItem({
  OnDragStart,

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
