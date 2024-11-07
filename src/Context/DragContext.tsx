import { createContext, MutableRefObject, useRef } from "react";
import {
  Euler,
  Group,
  MathUtils,
  Matrix4,
  Object3D,
  Object3DEventMap,
  Quaternion,
  Vector3,
} from "three";
import { usePieces } from "../Hooks/usePieces";

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

  const HandleDroppedPlane = (
    obj1: Object3D<Object3DEventMap>,
    obj2: Object3D<Object3DEventMap>
  ) => {
    let plane1 = FindObjectWithId(obj1.userData.id);
    let plane2 = FindObjectWithId(obj2.userData.id);

    if (plane1 && plane2) {
      const newObjects = createdPlanes.filter((item) => plane1 !== item);
      plane2.addChild(plane1);
      plane1.parent = plane2;

      const parent = FindSceneObjectWithId(plane2.data.id);
      const child = FindSceneObjectWithId(plane1.data.id);

      if (parent && child) {
        const pos = new Vector3();
        const rot = new Quaternion();
        child.getWorldPosition(pos);
        child.getWorldQuaternion(rot);
        const position = parent.worldToLocal(pos);
        plane1.data.position = position;

        parent.updateMatrixWorld(true);
        child.updateMatrixWorld(true);

        // Step 1: Get the child's current world rotation as a rotation matrix
        const worldRotationMatrix = new Matrix4().makeRotationFromEuler(
          child.rotation
        );

        // Step 2: Convert the world rotation matrix to the local space of the new parent
        const parentInverseMatrix = new Matrix4()
          .copy(parent.matrixWorld)
          .invert();
        const localRotationMatrix = new Matrix4().multiplyMatrices(
          parentInverseMatrix,
          worldRotationMatrix
        );

        // Step 3: Extract the local rotation as Euler angles
        const localRotation = new Euler().setFromRotationMatrix(
          localRotationMatrix
        );
        plane1.data.rotation = new Vector3(
          MathUtils.radToDeg(localRotation.x),
          MathUtils.radToDeg(localRotation.y),
          MathUtils.radToDeg(localRotation.z)
        );
        // Step 4: Apply the calculated local rotation to the child object
      }
      setCreatedPlanes(newObjects);
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
