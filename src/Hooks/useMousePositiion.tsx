import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector2 } from "three";

export function useMousePosition() {
  const mouse = useRef(new Vector2()); // Store normalized mouse coordinates
  const { gl } = useThree(); // Get the camera and renderer from R3F

  const updateMousePosition = (event: MouseEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  useEffect(() => {
    document.addEventListener("pointermove", updateMousePosition);
  }, []);

  return { mousePos: mouse };
}
