import { HTMLAttributes } from "react";

interface CenterLayoutProps extends HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  vertical?: boolean;
}

export default function CenterLayout({
  children,
  horizontal,
  vertical,
}: CenterLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: horizontal ? "center" : "flex-start",
        alignItems: vertical ? "center" : "flex-start",
      }}
    >
      {children}
    </div>
  );
}
