import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Object3D, Object3DEventMap } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
import { PiecePlane } from "../Core/PiecePlane";
import { BasisPlane } from "../Core/BasisPlane";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdBasis: BasisPlane[];
  setCreatedBasis: Dispatch<SetStateAction<BasisPlane[]>>;
  createdPieces: PiecePlane[];
  setCreatedPieces: Dispatch<SetStateAction<PiecePlane[]>>;
  FindPieceWithId: (id: number) => PiecePlane | null;
  FindBaseWithId: (id: number) => BasisPlane | null;
  FindSceneObjectWithId: (id: number) => Object3D<Object3DEventMap> | null;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [createdBasis, setCreatedBasis] = useState<BasisPlane[]>([]);
  const [createdPieces, setCreatedPieces] = useState<PiecePlane[]>([]);
  const { ContainerRef } = useContext(PlanesContainerContext);

  useEffect(() => {
    console.log(createdBasis);
    console.log(createdPieces);
  }, [createdBasis, createdPieces]);

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

  const FindBaseWithId = (id: number): BasisPlane | null => {
    for (const base of createdBasis) {
      if (base.id === id) return base;
    }
    return null;
  };

  const FindPieceWithId = (id: number): PiecePlane | null => {
    for (const piece of createdPieces) {
      if (piece.id === id) return piece;
    }

    for (const base of createdBasis) {
      for (const child of base.children) {
        if (child.child.id === id) return child.child;
      }
    }

    return null;
  };

  return (
    <PiecesContext.Provider
      value={{
        createdBasis,
        createdPieces,
        setCreatedBasis,
        setCreatedPieces,
        FindPieceWithId,

        FindBaseWithId,
        FindSceneObjectWithId,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
