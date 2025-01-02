import { useRef } from "react";
import { useInView } from "react-intersection-observer";

interface HomeAboutSectionProps {
  paragraph: string;
  img: string;
  label: string;
  direction?: "left" | "right";
  background?: "primary" | "secondary";
}

export default function HomeAboutSection({
  img,
  label,
  paragraph,
  direction = "left",
  background = "primary",
}: HomeAboutSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const elementRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={(reff) => {
        ref(reff);
        elementRef.current = reff;
      }}
      style={{
        padding: "40px 0",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: direction === "left" ? "row" : "row-reverse",
        backgroundColor: background === "primary" ? "#fff" : "#e9e9e9",
        maxWidth: "1600px",
        margin: "auto",
        marginBottom: "20px",
        transition: "all 0.5s ease-out",
        opacity: inView ? 1 : 0,
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          lineHeight: "2",
          flexBasis: "50%",
          padding: "20px",
          transition: "all 0.5s ease-out",
          transform: inView
            ? "translateX(0)"
            : direction === "left"
            ? "translateX(-500px)"
            : "translateX(500px)",
        }}
      >
        <h2>{label}</h2>
        <p>{paragraph}</p>
      </div>
      <div
        style={{
          maxWidth: "500px",
          flexBasis: "50%",
          padding: "20px",
          transition: "all 0.5s ease-out",

          transform: inView
            ? "translateX(0)"
            : direction === "left"
            ? "translateX(500px)"
            : "translateX(-500px)",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            aspectRatio: "5/4",
          }}
          src={img}
          alt=""
        />
      </div>
    </div>
  );
}
