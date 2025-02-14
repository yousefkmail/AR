import { MovementMode } from "@core";
import MovementModeButton from "./MovementModeButton";
import Spacer from "@components/Layout/Spacer";

export const SceneSettings = () => {
  return (
    <div>
      <Spacer marginBottom={8}>Piece Movement Mode</Spacer>
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
    </div>
  );
};
