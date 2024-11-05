import { useContext } from "react";
import { SceneSettingsContext } from "../Context/SceneSettingsContext";

export const useSceneSettings = () => {
  const { MovementMode, SetMovementMode } = useContext(SceneSettingsContext);
  return { MovementMode, SetMovementMode };
};
