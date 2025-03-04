import React, { createContext, Dispatch, useContext } from "react";
import { Object3D, Object3DEventMap, Vector3 } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
import { PieceObject } from "../Models/R3F/PiecePlane";
import { CreatedPiecesAction, usePieces } from "../Hooks/usePieces";
import {
  createdTemplatesAction,
  useTemplateObjects,
} from "../Hooks/useTemplateObjects";
import { PieceChild } from "../Models/TemplateModel";
import { TemplateObject } from "../Models/R3F/Template";
import { useAddNotification } from "@features/NotificationService/useAddNotification";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdPieces: PieceObject[];
  createdTemplates: TemplateObject[];
  DispatchCreatedPieces: Dispatch<CreatedPiecesAction>;
  DispatchCreatedTemplates: Dispatch<createdTemplatesAction>;
  FindPieceWithId: (id: string) => PieceObject | PieceChild | null;
  FindTemplateWithId: (id: string) => TemplateObject | null;
  FindSceneObjectWithId: (id: string) => Object3D<Object3DEventMap> | null;
  FindParent: (piece: PieceChild) => TemplateObject | undefined;
  HandlePieceDroppedOnPlane: (
    piece: PieceObject,
    basis: TemplateObject,
    NDCPosition: Vector3
  ) => void;
  Deattach_Piece: (piece: PieceChild) => void;
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

  const { createdTemplates, dispatchCreatedTemplates } = useTemplateObjects();

  const { DispatchCreatedPieces, createdPieces } = usePieces();

  const addNotification = useAddNotification();
  const Deattach_Piece = (piece: PieceChild) => {
    dispatchCreatedTemplates({ type: "deattach_piece", payload: piece });

    const newPiece: PieceObject = {
      id: piece.id,
      piece: { ...piece.piece },
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };

    const childWorld = FindSceneObjectWithId(piece.id);
    const worldPosition = new Vector3();
    childWorld?.getWorldPosition(worldPosition);

    newPiece.position = [
      worldPosition.x,
      worldPosition.y + 0.3,
      worldPosition.z,
    ];

    DispatchCreatedPieces({ type: "add", payload: newPiece });
  };

  const FindTemplateWithId = (id: string): TemplateObject | null => {
    for (const base of createdTemplates) {
      if (base.id === id) return base;
    }
    return null;
  };

  const FindPieceWithId = (id: string): PieceObject | PieceChild | null => {
    for (const piece of createdPieces) {
      if (piece.id === id) return piece;
    }

    for (const base of createdTemplates) {
      for (const child of base.templateModel.pieces) {
        if (child.id === id) return child;
      }
    }
    return null;
  };

  const HandlePieceDroppedOnPlane = (
    piece: PieceObject,
    basis: TemplateObject,
    NDCPosition: Vector3
  ) => {
    for (let i = 0; i < basis.templateModel.base.layers.length; i++) {
      const space =
        basis.templateModel.base.layers[i].width -
        basis.templateModel.pieces.reduce(
          (prev, next) => prev + (next.layer === i ? next.piece.width : 0),
          0
        );
      if (space > piece.piece.width) {
        //insert the piece into an appropriate place.
        dispatchCreatedTemplates({
          type: "add_child",
          payload: {
            piece,
            template: basis,
            position: [NDCPosition.x, NDCPosition.y, NDCPosition.z],
            layer: i,
          },
        });

        DispatchCreatedPieces({
          type: "delete",
          payload: piece,
        });
        addNotification(
          `${piece.piece.name} has been added on  ${basis.templateModel.base.layers[i].name}`,
          "info"
        );
        break;
      }
    }
  };

  const FindParent = (piece: PieceChild) => {
    const parentTemplate = createdTemplates.find((template) =>
      template.templateModel.pieces.some((child) => child.id === piece.id)
    );
    return parentTemplate;
  };

  return (
    <PiecesContext.Provider
      value={{
        Deattach_Piece,
        createdPieces,
        createdTemplates,
        DispatchCreatedTemplates: dispatchCreatedTemplates,
        DispatchCreatedPieces,
        FindPieceWithId,
        FindParent,
        FindTemplateWithId,
        FindSceneObjectWithId,
        HandlePieceDroppedOnPlane,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
