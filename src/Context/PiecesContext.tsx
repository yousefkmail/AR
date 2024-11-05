import { Entry } from "contentful";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Piece } from "../Contentful/Types/PieceType";
import { PlaneNode } from "../Core/PlaneObject";
import {
  Euler,
  MathUtils,
  Matrix4,
  Object3D,
  Object3DEventMap,
  Quaternion,
  Vector3,
} from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdPlanes: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  setCreatedPlanes: Dispatch<
    SetStateAction<Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>
  >;

  objects: PlaneNode[];
  createdObjects: Dispatch<SetStateAction<PlaneNode[]>>;
  HandleDroppedPlane: (
    obj1: Object3D<Object3DEventMap>,
    obj2: Object3D<Object3DEventMap>
  ) => void;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [createdPlanes, setCreatedPlanes] = useState<
    Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
  >([]);

  const [objects, createdObjects] = useState<PlaneNode[]>([]);

  const HandleDroppedPlane = (
    obj1: Object3D<Object3DEventMap>,
    obj2: Object3D<Object3DEventMap>
  ) => {
    let plane1 = FindObjectWithId(obj1.userData.id);
    let plane2 = FindObjectWithId(obj2.userData.id);

    if (plane1 && plane2) {
      const newObjects = objects.filter((item) => plane1 !== item);
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
      createdObjects(newObjects);
    }
  };
  const { ContainerRef } = useContext(PlanesContainerContext);
  const FindSceneObjectWithId = (
    id: number
  ): Object3D<Object3DEventMap> | null => {
    let foundObj = null;
    ContainerRef.current?.children.forEach((item) => {
      if (item.userData.id === id) {
        foundObj = item;
      }
    });

    return foundObj;
  };
  const FindObjectWithId = (id: number): PlaneNode | null => {
    let objj: PlaneNode | null = null;
    objects.forEach((obj) => {
      if (obj.data.id === id) {
        objj = obj;
      }
    });

    return objj;
  };
  return (
    <PiecesContext.Provider
      value={{
        createdPlanes,
        setCreatedPlanes,
        objects,
        createdObjects,
        HandleDroppedPlane,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
