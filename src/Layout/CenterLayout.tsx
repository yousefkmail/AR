import { HTMLAttributes } from "react";

interface CenterLayoutProps extends HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  vertical?: boolean;
}

export default function CenterLayout({
  children,
  horizontal,
  vertical,
  className,
}: CenterLayoutProps) {
  return (
    <div
      className={className}
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
