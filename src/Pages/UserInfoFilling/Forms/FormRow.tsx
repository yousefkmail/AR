import { HTMLAttributes } from "react";

interface FormRowProps extends HTMLAttributes<HTMLDivElement> {}
export default function FormRow({ children }: FormRowProps) {
  return <div style={{ display: "flex", flexWrap: "wrap" }}>{children}</div>;
}
