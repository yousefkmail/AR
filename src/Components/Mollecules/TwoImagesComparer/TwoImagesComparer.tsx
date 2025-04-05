import { useEffect, useRef } from "react";

interface TwoImagesComparerProps {
  beforeImageSrc: string;
  afterImageSrc: string;
  width?: string;
  height?: string;
}

export default function TwoImagesComparer({
  afterImageSrc,
  beforeImageSrc,
  width = "600px",
  height = "300px",
}: TwoImagesComparerProps) {
  const divider = useRef<HTMLDivElement>(null);
  const beforeImage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let isDragging = false;
    if (!divider || !beforeImage) return;
    divider.current?.addEventListener("mousedown", function (_e) {
      isDragging = true;
      document.body.style.cursor = "ew-resize";
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      const container = document.querySelector(".comparison-container");
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const containerLeft = containerRect.left;
      const containerWidth = containerRect.width;

      let x = e.clientX - containerLeft;

      // Keep within container bounds
      x = Math.max(0, Math.min(x, containerWidth));

      const percentage = (x / containerWidth) * 100;
      if (beforeImage.current) {
        beforeImage.current.style.width = percentage + "%";
      }
      if (divider.current) {
        divider.current.style.left = percentage + "%";
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
      document.body.style.cursor = "";
    });
  }, []);
  console.log(width);
  return (
    <div style={{ width, height }} className="comparison-container">
      <div className="image-wrapper">
        <div ref={beforeImage} className="before-image">
          <img
            style={{ width, height }}
            draggable={false}
            src={beforeImageSrc}
            alt="Before image"
            className="before-image-img"
          />
        </div>
        <div className="after-image">
          <img
            style={{ width, height }}
            draggable={false}
            src={afterImageSrc}
            alt="Before image"
            className="after-image-img"
          />
        </div>
      </div>
      <div ref={divider} className="divider" id="divider"></div>
    </div>
  );
}
