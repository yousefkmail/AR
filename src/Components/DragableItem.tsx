import { HTMLAttributes } from "react";

interface DragableItemProps extends HTMLAttributes<HTMLDivElement> {
  OnDragStart?: () => void;
}
export default function DraggableItem({
  children,
  style,
  ...rest
}: DragableItemProps) {
  return (
    <div
      draggable
      {...rest}
      style={{
        backgroundColor: "white",
        cursor: "pointer",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
