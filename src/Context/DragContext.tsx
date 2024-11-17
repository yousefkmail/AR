import { createContext, MutableRefObject, useRef } from "react";
import { Group, MathUtils, Object3D, Object3DEventMap, Vector3 } from "three";
import { usePieces } from "../Hooks/usePieces";
import { BasisPlane } from "../Core/BasisPlane";
import { PiecePlane } from "../Core/PiecePlane";
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
    FindObjectWithId,
    FindSceneObjectWithId,
    createdPlanes,
    setCreatedPlanes,
  } = usePieces();

  const { mousePos } = useMousePosition();
  const { camera } = useThree();
  const HandleDroppedPlane = (
    obj1: Object3D<Object3DEventMap>,
    obj2: Object3D<Object3DEventMap>
  ) => {
    let plane1 = FindObjectWithId(obj1.userData.id);
    let plane2 = FindObjectWithId(obj2.userData.id);

    if (plane1 && plane2) {
      const parent = FindSceneObjectWithId(plane2.id);
      const child = FindSceneObjectWithId(plane1.id);

      const newObjects = createdPlanes.filter((item) => plane1 !== item);
      if (plane2 instanceof BasisPlane && plane1 instanceof PiecePlane) {
        if (parent && child) {
          const position = NDCToObjectWorld(mousePos, parent, camera);

          const worldPos = MathUtils.clamp(
            parent?.worldToLocal(position).x,
            -(plane2.width / 100),
            plane2.width / 100
          );
          const pos: Vector3 = new Vector3();
          plane2.position = parent.getWorldPosition(pos);
          plane2.addChild(plane1, 0, new Vector3(worldPos, 0, 0));
          plane1.setParent(plane2);
        }
        setCreatedPlanes(newObjects);
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
