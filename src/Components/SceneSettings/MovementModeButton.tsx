import { ReactNode } from "react";
import { ClassnameMerge } from "../../Utils/CssUtils";
import Button from "../Button/Button";
import {
  MovementMode,
  useSceneSettingsStore,
} from "@core/Store/SceneSettingsStore";

interface MovementModeButtonProps {
  children: ReactNode;
  OnClickMovementMode: MovementMode;
}
export default function MovementModeButton({
  children,
  OnClickMovementMode,
}: MovementModeButtonProps) {
  const { movementMode, setMovementMode } = useSceneSettingsStore();

  return (
    <Button
      className={ClassnameMerge(
        "settings-movemode-button",
        movementMode === OnClickMovementMode
          ? "settings-movemode-button-active"
          : ""
      )}
      onClick={() => setMovementMode(OnClickMovementMode)}
    >
      {children}
    </Button>
  );
}
