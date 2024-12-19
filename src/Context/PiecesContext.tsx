import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Object3D, Object3DEventMap, Vector3 } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
import { BasisPlaneViewModel } from "../Core/Viewmodels/BasisPlaneViewModel";
import { PiecePlaneViewModel } from "../Core/Viewmodels/PiecePlaneViewModel";
import { BasisPlane } from "../Core/BasisPlane";
import { PiecePlane } from "../Core/PiecePlane";
import { v4 } from "uuid";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

type CreatedBasisAction =
  | { type: "add"; payload: BasisPlaneViewModel }
  | {
      type: "changeLayer";
      payload: { layer: number; piece: PiecePlaneViewModel };
    }
  | { type: "delete"; payload: BasisPlaneViewModel }
  | { type: "deattach_piece"; payload: PiecePlaneViewModel }
  | { type: "set"; payload: BasisPlaneViewModel[] }
  | {
      type: "move";
      payload: { basis: BasisPlaneViewModel; position: Vector3 };
    };

interface PiecesContextProps {
  createdBasis: BasisPlaneViewModel[];
  DispatchCreatedBasis: Dispatch<CreatedBasisAction>;
  createdPieces: PiecePlaneViewModel[];
  setCreatedPieces: Dispatch<SetStateAction<PiecePlaneViewModel[]>>;
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
  const [createdPieces, setCreatedPieces] = useState<PiecePlaneViewModel[]>([]);
  const [createdBasis, DispatchCreatedBasis] = useReducer(
    CreatedBasisReducer,
    []
  );

  function CreatedBasisReducer(
    state: BasisPlaneViewModel[],
    action: CreatedBasisAction
  ) {
    switch (action.type) {
      case "add": {
        return [...state, action.payload];
      }

      case "delete": {
        return state.filter(
          (item) => item.BasisPlane.id !== action.payload.BasisPlane.id
        );
      }

      case "changeLayer": {
        return state.map((parent) => {
          const plane = new BasisPlane(
            { ...parent.BasisPlane },
            parent.BasisPlane.id
          );
          const planeViewModel = new BasisPlaneViewModel(plane);
          const parentObj = FindSceneObjectWithId(parent.BasisPlane.id);
          if (parentObj) plane.position = parentObj.position;

          plane.layers = parent.BasisPlane.layers;
          planeViewModel.children = parent.children;

          const sceneObj = FindSceneObjectWithId(
            action.payload.piece.PiecePlane.id
          );
          if (sceneObj)
            action.payload.piece.PiecePlane.position = sceneObj.position;

          planeViewModel.UpdateChildLayer(
            action.payload.piece,
            action.payload.layer
          );
          return planeViewModel;
        });
      }
      case "deattach_piece": {
        let result = state.map((item) => {
          if (item.BasisPlane.id === action.payload.parent?.BasisPlane.id) {
            item.children = item.children.filter(
              (item) =>
                item.child.PiecePlane.id !== action.payload.PiecePlane.id
            );
            return item;
          } else return item;
        });

        return result;
      }

      case "move": {
        return state.map((item) => {
          if (item.BasisPlane.id === action.payload.basis.BasisPlane.id) {
            item.BasisPlane.position = action.payload.position;
            return item;
          } else return item;
        });
      }
      case "set": {
        return action.payload;
      }
      default:
        return state;
    }
  }

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
    console.log(createdPieces);
    setCreatedPieces((prev) => [...prev, newPiece]);
  };

  useEffect(() => {
    console.log(createdPieces);
  }, [createdPieces]);

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

    const newObjects = createdPieces.filter((item) => piece !== item);

    if (parent && child) {
      const pos: Vector3 = new Vector3();
      basis.BasisPlane.position = parent.getWorldPosition(pos);
      basis.addChild(piece, 0, parent?.worldToLocal(NDCPosition).x);
      piece.setParent(basis);
    }

    DispatchCreatedBasis({
      type: "set",
      payload: createdBasis.map((item) => {
        if (item.BasisPlane.id === basis.BasisPlane.id) {
          return basis;
        } else return item;
      }),
    });
    setCreatedPieces(newObjects);
  };

  return (
    <PiecesContext.Provider
      value={{
        createdBasis,
        Deattach_Piece,
        createdPieces,
        DispatchCreatedBasis,
        setCreatedPieces,
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
