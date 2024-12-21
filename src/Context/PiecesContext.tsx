import React, { createContext, Dispatch, useContext } from "react";
import { Object3D, Object3DEventMap, Vector3 } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
import { BasisPlaneViewModel } from "../Core/Viewmodels/BasisPlaneViewModel";
import { PiecePlaneViewModel } from "../Core/Viewmodels/PiecePlaneViewModel";
import { PiecePlane } from "../Core/PiecePlane";
import { v4 } from "uuid";
import { CreatedBasisAction, useBasis } from "../Hooks/useBasis";
import { CreatedPiecesAction, usePieces } from "../Hooks/usePieces";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdBasis: BasisPlaneViewModel[];
  DispatchCreatedBasis: Dispatch<CreatedBasisAction>;
  createdPieces: PiecePlaneViewModel[];
  DispatchCreatedPieces: Dispatch<CreatedPiecesAction>;
  FindPieceWithId: (id: string) => PiecePlaneViewModel | null;
  FindBaseWithId: (id: string) => BasisPlaneViewModel | null;
  FindSceneObjectWithId: (id: string) => Object3D<Object3DEventMap> | null;
  HandlePieceDroppedOnPlane: (
    piece: PiecePlaneViewModel,
    basis: BasisPlaneViewModel,
    NDCPosition: Vector3
  ) => void;
  Deattach_Piece: (piece: PiecePlaneViewModel) => void;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const { ContainerRef } = useContext(PlanesContainerContext);

  const FindSceneObjectWithId = (
    id: string
  ): Object3D<Object3DEventMap> | null => {
    let foundObject: Object3D<Object3DEventMap> | null = null;
    ContainerRef.current?.group?.traverse((object) => {
      if (object.userData.id === id && foundObject === null) {
        foundObject = object;
      }
    });
    return foundObject;
  };

  const { DispatchCreatedBasis, createdBasis } = useBasis();

  const { DispatchCreatedPieces, createdPieces } = usePieces();

  const Deattach_Piece = (piece: PiecePlaneViewModel) => {
    if (!piece.parent) return;
    DispatchCreatedBasis({ type: "deattach_piece", payload: piece });

    const newPiece = new PiecePlaneViewModel(
      new PiecePlane({ ...piece.PiecePlane }, v4())
    );
    newPiece.parent = null;
    const childWorld = FindSceneObjectWithId(piece.PiecePlane.id);
    const worldPosition = new Vector3();
    childWorld?.getWorldPosition(worldPosition);

    newPiece.PiecePlane.position = new Vector3(
      worldPosition.x,
      worldPosition.y + 0.3,
      worldPosition.z
    );
    newPiece.PiecePlane.rotation = new Vector3();
    DispatchCreatedPieces({ type: "add", payload: newPiece });
  };

  const FindBaseWithId = (id: string): BasisPlaneViewModel | null => {
    for (const base of createdBasis) {
      if (base.BasisPlane.id === id) return base;
    }
    return null;
  };

  const FindPieceWithId = (id: string): PiecePlaneViewModel | null => {
    for (const piece of createdPieces) {
      if (piece.PiecePlane.id === id) return piece;
    }

    for (const base of createdBasis) {
      for (const child of base.children) {
        if (child.child.PiecePlane.id === id) return child.child;
      }
    }

    return null;
  };

  const HandlePieceDroppedOnPlane = (
    piece: PiecePlaneViewModel,
    basis: BasisPlaneViewModel,
    NDCPosition: Vector3
  ) => {
    const parent = FindSceneObjectWithId(basis.BasisPlane.id);
    const child = FindSceneObjectWithId(piece.PiecePlane.id);

    if (parent && child) {
      piece.setParent(basis);
      basis.addChild(piece, 1, parent?.worldToLocal(NDCPosition).x);
    }

    DispatchCreatedBasis({
      type: "set",
      payload: createdBasis.map((item) => {
        if (item.BasisPlane.id === basis.BasisPlane.id) {
          return basis;
        } else return item;
      }),
    });
    DispatchCreatedPieces({
      type: "delete",
      payload: piece,
    });
  };

  return (
    <PiecesContext.Provider
      value={{
        createdBasis,
        Deattach_Piece,
        createdPieces,
        DispatchCreatedBasis,
        DispatchCreatedPieces,
        FindPieceWithId,
        FindBaseWithId,
        FindSceneObjectWithId,
        HandlePieceDroppedOnPlane,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
