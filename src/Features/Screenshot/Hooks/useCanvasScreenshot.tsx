import { useContext } from "react";
import { EnvironmentContext } from "../Context/EnvironmentContext";
import { CanvasScreneshotContext } from "../Context/CanvasScreenshotContext";
import { useThree } from "@react-three/fiber";

export const useCanvasScreenshot = () => {
  const { environment } = useContext(EnvironmentContext);

  const { gl, scene, camera } = useThree();
  const { anchorRef } = useContext(CanvasScreneshotContext);

  const Screenshot = () => {
    environment.current?.traverse((child) => {
      child.visible = false;
    });

    gl.clear();

    gl.render(scene, camera);

    const imageDataUrl = gl.domElement.toDataURL("image/png");

    if (anchorRef?.current) {
      anchorRef.current.href = imageDataUrl;
      anchorRef.current.download = "screenshot.png";
      anchorRef.current?.click();
    }

    environment.current?.traverse((child) => {
      child.visible = true;
    });
  };

  return { Screenshot };
};
