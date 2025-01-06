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
      className={
        "about-section-container overflow-hidden relative " +
        (direction === "left" ? "flex-row " : "flex-row-reverse ") +
        (inView ? "opacity-100 " : "opacity-0 ") +
        (background === "primary" ? "color-primary" : "color-gray")
      }
    >
      <div
        className={
          "about-section-split " +
          (!inView
            ? direction === "left"
              ? "about-section-move-left"
              : "about-section-move-right"
            : "")
        }
      >
        <h2>{label}</h2>
        <p>{paragraph}</p>
      </div>
      <div
        className={
          "about-section-split " +
          (!inView
            ? direction === "left"
              ? "about-section-move-right"
              : "about-section-move-left"
            : "")
        }
      >
        <img className="about-section-image" src={img} alt="" />
      </div>
    </div>
  );
}
