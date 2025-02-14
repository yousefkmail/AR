import { ReactNode } from "react";
import { ClassnameMerge } from "../../Utils/CssUtils";
import { useSceneSettings } from "../../Hooks/useSceneSettings";
import Button from "../Button/Button";
import { MovementMode } from "@core/index";
import Spacer from "@components/Layout/Spacer";

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
