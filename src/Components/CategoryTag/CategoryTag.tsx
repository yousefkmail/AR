import { HTMLAttributes } from "react";

interface CategoryTagProps extends HTMLAttributes<HTMLSpanElement> {}
export default function CategoryTag(props: CategoryTagProps) {
  return (
    <span
      {...props}
      style={{
        backgroundColor: "#8a2be2",
        color: "white",
        borderRadius: "5px",
        padding: "5px",
        margin: "5px",
        fontSize: "0.8em",
      }}
    />
  );
}
