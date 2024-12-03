import { createContext, MutableRefObject, useRef } from "react";
import { Group, Object3D, Object3DEventMap, Vector3 } from "three";
import { usePieces } from "../Hooks/usePieces";
import { NDCToObjectWorld } from "../Utils/ThreeUtils";
import { useMousePosition } from "../Hooks/useMousePositiion";
import { useThree } from "@react-three/fiber";
import { BasisPlane } from "../Core/BasisPlane";

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
    setCreatedPieces,
    FindBaseWithId,
    FindPieceWithId,
    createdPieces,
    setCreatedBasis,
  } = usePieces();

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
      const child = FindSceneObjectWithId(plane1.id);

      const newObjects = createdPieces.filter((item) => plane1 !== item);

      if (parent && child) {
        const position = NDCToObjectWorld(mousePos, parent, camera);

        const pos: Vector3 = new Vector3();
        plane2.position = parent.getWorldPosition(pos);
        plane2.addChild(plane1, 0, parent?.worldToLocal(position).x);
        plane1.setParent(plane2);
      }
      setCreatedBasis((prev) =>
        prev.map((item) => {
          if (item.id === plane2.id) {
            return plane2;
          } else return item;
        })
      );

      setCreatedPieces(newObjects);
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
