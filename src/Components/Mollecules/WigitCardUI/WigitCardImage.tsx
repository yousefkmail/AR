import { HTMLAttributes } from "react";

type WigitCardImageProps = {
  src: string;
};
export default function WigitCardImage({
  src,
  ...rest
}: WigitCardImageProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        backgroundColor: "rgb(238, 238, 238)",
        width: "100%",
        padding: "7px",
      }}
      {...rest}
    >
      <img
        draggable={false}
        loading="lazy"
        className="template-img"
        src={src}
        alt=""
      />
    </div>
  );
}
