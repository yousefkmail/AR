import { create } from "zustand";

export enum MovementMode {
  Parent,
  Child,
}

export interface SceneSettingsStoreProps {
  movementMode: MovementMode;
  setMovementMode: (mode: MovementMode) => void;
  cameraRotation: boolean;
  setCameraRotation: (state: boolean) => void;
}

export const useSceneSettingsStore = create<SceneSettingsStoreProps>((set) => ({
  cameraRotation: true,
  movementMode: MovementMode.Parent,
  setCameraRotation: (state: boolean) => {
    set(() => ({ cameraRotation: state }));
  },
  setMovementMode: (state: MovementMode) => {
    set(() => ({ movementMode: state }));
  },
}));
