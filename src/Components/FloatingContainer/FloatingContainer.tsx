import { HTMLAttributes } from "react";

interface FloatingContainerProps extends HTMLAttributes<HTMLDivElement> {
  posX: number;
  posY: number;
}
export default function FloatingContainer({
  posX,
  posY,
  children,
}: Partial<FloatingContainerProps>) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "10px",
        left: posX,
        top: posY,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}
