import { useRef } from "react";
import { Camera, Object3D, Object3DEventMap, Raycaster, Scene } from "three";
import { useMousePosition } from "./useMousePositiion";
import { SetObjectLayerTraverse } from "../Utils/ThreeUtils";

export const useMouseRaycaster = (camera: Camera, scene: Scene) => {
  const raycaster = useRef(new Raycaster());

  let ignoredArray: Object3D<Object3DEventMap>[] = [];
  const { mousePos } = useMousePosition();

  const getFirstObject = () => {
    raycaster.current.setFromCamera(mousePos, camera);
    ignoredArray.forEach((object) => {
      SetObjectLayerTraverse(object, 1);
    });

    const intersects = raycaster.current.intersectObjects(scene.children, true);

    ignoredArray.forEach((object) => {
      SetObjectLayerTraverse(object, 0);
    });

    return intersects.length > 0 ? intersects[0] : null;
  };

  const setIgnoredArray = (array: Object3D<Object3DEventMap>[]) => {
    ignoredArray = array;
  };
  return { getFirstObject, setIgnoredArray };
};
