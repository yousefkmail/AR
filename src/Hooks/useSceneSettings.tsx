import { SceneSettingsContext } from "@core";
import { useContext } from "react";

export const useSceneSettings = () => {
  const { movementMode, SetMovementMode } = useContext(SceneSettingsContext);
  return { movementMode, SetMovementMode };
};
