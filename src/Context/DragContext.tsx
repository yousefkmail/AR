import { createContext, MutableRefObject, useRef } from "react";
import { Group, Object3D, Object3DEventMap } from "three";
import { useFullPieces } from "../Hooks/useFullPieces";
import { NDCToObjectWorld } from "../Utils/ThreeUtils";
import { useMousePosition } from "../Hooks/useMousePositiion";
import { useThree } from "@react-three/fiber";

interface DragContextProps {
  DraggedRef: MutableRefObject<Group | null>;
  HoveredObject: MutableRefObject<Object3D<Object3DEventMap> | undefined>;
  HandleDroppedPlane: (
    obj1: Object3D<Object3DEventMap>,
    obj2: Object3D<Object3DEventMap>
  ) => void;
}

export const DragContext = createContext<DragContextProps>(
  {} as DragContextProps
);

export const DragContextProvider = ({ children }: any) => {
  const DraggedRef = useRef<Group | null>(null);
  const HoveredObject = useRef<Object3D<Object3DEventMap> | undefined>();
  const {
    FindSceneObjectWithId,
    FindBaseWithId,
    FindPieceWithId,
    HandlePieceDroppedOnPlane,
  } = useFullPieces();

  const { mousePos } = useMousePosition();
  const { camera } = useThree();
  const HandleDroppedPlane = (
    obj1: Object3D<Object3DEventMap>,
    obj2: Object3D<Object3DEventMap>
  ) => {
    let plane1 = FindPieceWithId(obj1.userData.id);
    let plane2 = FindBaseWithId(obj2.userData.id);
    if (plane1 && plane2) {
      const parent = FindSceneObjectWithId(plane2.id);
      if (parent) {
        const position = NDCToObjectWorld(mousePos, parent, camera);
        HandlePieceDroppedOnPlane(plane1, plane2, position);
      }
    }
  };

  return (
    <DragContext.Provider
      value={{ DraggedRef, HoveredObject, HandleDroppedPlane }}
    >
      {children}
    </DragContext.Provider>
  );
};
