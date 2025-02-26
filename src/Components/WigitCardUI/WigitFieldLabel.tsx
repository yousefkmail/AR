import { PropsWithChildren } from "react";

export default function WigitFieldLabel({ children }: PropsWithChildren) {
  return (
    <div style={{ fontWeight: "bold", minWidth: "100px" }}>{children}</div>
  );
}
