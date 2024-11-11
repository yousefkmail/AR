import { HTMLAttributes } from "react";

interface CategoryTagProps extends HTMLAttributes<HTMLSpanElement> {}
export default function CategoryTag(props: CategoryTagProps) {
  return <span className="tag" {...props} />;
}
