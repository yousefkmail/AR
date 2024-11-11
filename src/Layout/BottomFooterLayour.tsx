import React from "react";

interface BottomFooterLayoutProps {
  Page: React.ReactNode;
  Footer: React.ReactNode;
}

export default function BottomFooterLayour({
  Footer,
  Page,
}: BottomFooterLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {Page}
      {Footer}
    </div>
  );
}
