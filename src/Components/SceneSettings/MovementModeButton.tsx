import { ReactNode } from "react";
import { ClassnameMerge } from "../../Utils/CssUtils";
import { MovementMode } from "../../Context/SceneSettingsContext";
import { useSceneSettings } from "../../Hooks/useSceneSettings";
import Spacer from "../../Layout/Spacer";
import Button from "../Button/Button";

interface MovementModeButtonProps {
  children: ReactNode;
  OnClickMovementMode: MovementMode;
}
export default function MovementModeButton({
  children,
  OnClickMovementMode,
}: MovementModeButtonProps) {
  const { movementMode, SetMovementMode } = useSceneSettings();
  return (
    <Button
      className={ClassnameMerge(
        "settings-movemode-button",
        movementMode === OnClickMovementMode
          ? "settings-movemode-button-active"
          : ""
      )}
      onClick={() => SetMovementMode(OnClickMovementMode)}
    >
      <Spacer padding={7}>{children}</Spacer>
    </Button>
  );
}
