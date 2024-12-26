import { HTMLAttributes, ReactNode } from "react";

interface CartItemLayoutProps extends HTMLAttributes<HTMLDivElement> {
  Price: ReactNode;
  Quantity: ReactNode;
  ProductDetails: ReactNode;
  TotalPrice: ReactNode;
}

export default function CartItemLayout({
  Price,
  ProductDetails,
  Quantity,
  TotalPrice,
  className,
}: CartItemLayoutProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "space-between",
        minHeight: "50px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flexGrow: "1",
          flexShrink: "2",
          paddingLeft: "10px",
          minWidth: "230px",
        }}
      >
        {ProductDetails}
      </div>
      <div
        style={{
          flexShrink: "1",
          flexBasis: "300px",
          paddingLeft: "20px",
        }}
      >
        {Price}
      </div>
      <div
        style={{
          flexShrink: "1",
          flexBasis: "300px",
          paddingLeft: "20px",
        }}
      >
        {Quantity}
      </div>
      <div
        style={{
          flexShrink: "1",
          flexBasis: "300px",
          paddingLeft: "20px",
        }}
      >
        {TotalPrice}
      </div>
    </div>
  );
}
