import { MovementMode } from "@core/Store/SceneSettingsStore";
import MovementModeButton from "./MovementModeButton";
import Spacer from "@components/Layout/Spacer";
import Button from "@components/Button/Button";

import { useContext, useRef } from "react";
import { CanvasContext } from "../../Context/CanvasContext";
import { EnvironmentContext } from "@features/Screenshot/Context/EnvironmentContext";

export const SceneSettings = () => {
  // const { Screenshot } = useCanvasScreenshot();

  const { gl, camera, scene } = useContext(CanvasContext);
  const { environment } = useContext(EnvironmentContext);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const Screenshot = () => {
    if (!gl?.current || !camera?.current || !scene?.current) return;

    environment.current?.traverse((child) => {
      child.visible = false;
    });

    gl.current.clear();

    gl.current.render(scene.current, camera.current);

    const imageDataUrl = gl.current.domElement.toDataURL("image/png");

    if (anchorRef?.current) {
      anchorRef.current.href = imageDataUrl;
      anchorRef.current.download = "screenshot.png";
      anchorRef.current?.click();
    }

    environment.current?.traverse((child) => {
      child.visible = true;
    });
  };
  return (
    <div>
      <Spacer marginBottom={8}>Wigits drag behaviour</Spacer>
      <Spacer marginBottom={24}>
        <div className="settings-movemode-buttons">
          <MovementModeButton OnClickMovementMode={MovementMode.Parent}>
            Base
          </MovementModeButton>
          <MovementModeButton OnClickMovementMode={MovementMode.Child}>
            Piece
          </MovementModeButton>
        </div>
      </Spacer>
      <Button onClick={Screenshot} style={{ width: "100%" }}>
        Take screenshot
      </Button>
      <a ref={anchorRef} style={{ display: "none" }} />
    </div>
  );
};
