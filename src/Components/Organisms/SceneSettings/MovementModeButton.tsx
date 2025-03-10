import { ReactNode } from "react";
import { Button } from "@mui/material";
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
      onClick={() => setMovementMode(OnClickMovementMode)}
      variant="contained"
      color={movementMode === OnClickMovementMode ? "primary" : "secondary"}
      sx={{ borderRadius: 0, flexGrow: 1 }}
    >
      {children}
    </Button>
  );
}
