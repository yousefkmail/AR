import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { PlaneNode } from "../Core/PlaneObject";
import { Object3D, Object3DEventMap } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdPlanes: PlaneNode[];
  setCreatedPlanes: Dispatch<SetStateAction<PlaneNode[]>>;
  FindObjectWithId: (id: number) => PlaneNode | null;
  FindSceneObjectWithId: (id: number) => Object3D<Object3DEventMap> | null;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [createdPlanes, setCreatedPlanes] = useState<PlaneNode[]>([]);
  const { ContainerRef } = useContext(PlanesContainerContext);

  const FindSceneObjectWithId = (
    id: number
  ): Object3D<Object3DEventMap> | null => {
    let foundObject: Object3D<Object3DEventMap> | null = null;
    ContainerRef.current?.traverse((object) => {
      if (object.userData.id === id && foundObject === null) {
        foundObject = object;
      }
    });
    return foundObject;
  };
  const FindObjectWithId = (id: number): PlaneNode | null => {
    let objj: PlaneNode | null = null;
    for (const node of createdPlanes) {
      const found = FindObjectInNodeWithId(node, id);
      if (found) {
        return found;
      }
    }

    return objj;
  };

  const FindObjectInNodeWithId = (
    node: PlaneNode,
    id: number
  ): PlaneNode | null => {
    if (node.data.id === id) return node;

    if (node.children.length < 1) return null;

    let foundNode: PlaneNode | null = null;
    for (const nodee of node.children) {
      foundNode = FindObjectInNodeWithId(nodee, id);
      if (foundNode) return foundNode;
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
