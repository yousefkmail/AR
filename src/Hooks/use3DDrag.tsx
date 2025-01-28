import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

type DragHandler = (position: [number, number, number]) => void;
type DropHandler = (event: MouseEvent) => void;

export const use3DDrag = (onDrag?: DragHandler, onDrop?: DropHandler) => {
  const { size, viewport } = useThree(); // Access Three.js size and viewport info
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = () => {
    setIsDragging(true);
  };

  const endDrag = (event: MouseEvent) => {
    setIsDragging(false);
    onDrop?.(event);
  };

  const handlePointerMove = (event: any) => {
    if (!isDragging) return;
    // Convert mouse position to viewport coordinates
    const { offsetX, offsetY } = event;
    const x = (offsetX / size.width) * viewport.width - viewport.width / 2;
    const y = -(offsetY / size.height) * viewport.height + viewport.height / 2;

    const newPosition: [number, number, number] = [x, y, 0];
    if (onDrag) onDrag(newPosition);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handlePointerMove);
      document.addEventListener("mouseup", endDrag);
    } else {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", endDrag);
    }

    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", endDrag);
    };
  }, [isDragging]);

  return {
    isDragging,
    events: {
      onPointerDown: startDrag,
    },
  };
};
