import { create } from "zustand";

interface CameraControlStoreProps {
  cameraControl: boolean;
  setCameraControl: (state: boolean) => void;
}

export const useCameraControlStore = create<CameraControlStoreProps>((set) => ({
  cameraControl: true,
  setCameraControl: (cameraState: boolean) => {
    set(() => ({ cameraControl: cameraState }));
  },
}));
