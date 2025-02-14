import { HTMLAttributes } from "react";

interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  padding?: number;
  margin?: number;
  marginBottom?: number;
}

export default function Spacer({
  margin,
  padding,
  marginBottom,
  children,
}: SpacerProps) {
  return (
    <div
      style={{
        margin: margin ? `${margin}px` : "0",
        padding: padding ? `${padding}px` : "0",
        marginBottom: marginBottom ? `${marginBottom}px` : "0",
      }}
    >
      {children}
    </div>
  );
}
