import { useContext } from "react";
import { SceneSettingsContext } from "../Context/SceneSettingsContext";

export const useSceneSettings = () => {
  const { movementMode, SetMovementMode } = useContext(SceneSettingsContext);
  return { movementMode, SetMovementMode };
};
