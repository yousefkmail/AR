import { MovementMode } from "../../Context/SceneSettingsContext";
import Spacer from "../../Layout/Spacer";
import MovementModeButton from "./MovementModeButton";

export const SceneSettings = () => {
  return (
    <Spacer padding={10}>
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
    </Spacer>
  );
};
