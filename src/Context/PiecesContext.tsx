import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Object3D, Object3DEventMap } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
import { PiecePlane } from "../Core/PiecePlane";
import { PlaneBase } from "../Core/PlaneBase";
import { BasisPlane } from "../Core/BasisPlane";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdPlanes: PlaneBase[];
  setCreatedPlanes: Dispatch<SetStateAction<PlaneBase[]>>;
  FindObjectWithId: (id: number) => PlaneBase | null;
  FindSceneObjectWithId: (id: number) => Object3D<Object3DEventMap> | null;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [createdPlanes, setCreatedPlanes] = useState<PlaneBase[]>([]);
  const { ContainerRef } = useContext(PlanesContainerContext);

  const FindSceneObjectWithId = (
    id: number
  ): Object3D<Object3DEventMap> | null => {
    let foundObject: Object3D<Object3DEventMap> | null = null;
    ContainerRef.current?.group?.traverse((object) => {
      if (object.userData.id === id && foundObject === null) {
        foundObject = object;
      }
    });
    return foundObject;
  };
  const FindObjectWithId = (id: number): PlaneBase | null => {
    let objj: PiecePlane | null = null;
    for (const node of createdPlanes) {
      const found = FindObjectInNodeWithId(node, id);
      if (found) {
        return found;
      }
    }

    return objj;
  };

  const FindObjectInNodeWithId = (
    node: PlaneBase,
    id: number
  ): PlaneBase | null => {
    if (node.id === id) return node;

    if (node instanceof BasisPlane) {
      for (const nodee of node.children) {
        if (nodee.child.id === id) return nodee.child;
      }
    }

    return null;
  };
  return (
    <PiecesContext.Provider
      value={{
        createdPlanes,
        setCreatedPlanes,
        FindObjectWithId,
        FindSceneObjectWithId,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
