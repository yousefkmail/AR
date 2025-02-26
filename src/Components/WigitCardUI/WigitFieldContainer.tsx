import { PropsWithChildren } from "react";

export default function WigitFieldContainer(props: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        margin: "7px 0",
      }}
    >
      {props.children}
    </div>
  );
}
