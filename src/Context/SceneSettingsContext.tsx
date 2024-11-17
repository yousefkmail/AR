import { createContext, SetStateAction, useState } from "react";
import { Dispatch } from "react";
export enum MovementMode {
  Parent,
  Child,
}

interface SceneSettings {
  movementMode: MovementMode;
  SetMovementMode: Dispatch<SetStateAction<MovementMode>>;
}
export const SceneSettingsContext = createContext<SceneSettings>({
  movementMode: MovementMode.Parent,
} as SceneSettings);

export const SceneSettingsContextProvider = ({ children }: any) => {
  const [movementMode, setMovementMode] = useState<MovementMode>(
    MovementMode.Parent
  );

  return (
    <SceneSettingsContext.Provider
      value={{ movementMode: movementMode, SetMovementMode: setMovementMode }}
    >
      {children}
    </SceneSettingsContext.Provider>
  );
};
