import { create } from "zustand";

export enum MovementMode {
  Parent,
  Child,
}

export interface SceneSettingsStoreProps {
  movementMode: MovementMode;
  setMovementMode: (mode: MovementMode) => void;
}

export const useSceneSettingsStore = create<SceneSettingsStoreProps>((set) => ({
  movementMode: MovementMode.Parent,
  setMovementMode: (state: MovementMode) => {
    set(() => ({ movementMode: state }));
  },
}));
