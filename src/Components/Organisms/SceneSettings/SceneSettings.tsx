import Spacer from "@components/Layout/Spacer";

import { useContext, useRef } from "react";
import { CanvasContext } from "../../../Context/CanvasContext";
import { EnvironmentContext } from "@features/Screenshot/Context/EnvironmentContext";
import { Button } from "@mui/material";
import MovementModeButton from "./MovementModeButton";
import { MovementMode } from "@core/Store/SceneSettingsStore";

export const SceneSettings = () => {
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
          <MovementModeButton OnClickMovementMode={MovementMode.Child}>
            Piece
          </MovementModeButton>
          <MovementModeButton OnClickMovementMode={MovementMode.Parent}>
            Base
          </MovementModeButton>
        </div>
      </Spacer>
      <Button
        variant="contained"
        onClick={Screenshot}
        style={{ width: "100%" }}
      >
        Take screenshot
      </Button>
      <a ref={anchorRef} style={{ display: "none" }} />
    </div>
  );
};
