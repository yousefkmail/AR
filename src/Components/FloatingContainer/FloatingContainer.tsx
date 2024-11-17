import React, { HTMLAttributes } from "react";

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
    <span
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "stretch",
        backgroundColor: "white",
        borderRadius: "10px",
        left: posX,
        top: posY,
      }}
    >
      {children}
    </span>
  );
}
