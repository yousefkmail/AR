import { Vector3 } from "three";
import { PiecePlaneViewModel } from "../Core/Viewmodels/PiecePlaneViewModel";
import { useReducer } from "react";

export type CreatedPiecesAction =
  | { type: "add"; payload: PiecePlaneViewModel }
  | { type: "delete"; payload: PiecePlaneViewModel }
  | { type: "set"; payload: PiecePlaneViewModel[] }
  | {
      type: "move";
      payload: { piece: PiecePlaneViewModel; position: Vector3 };
    };

export const usePieces = () => {
  const [createdPieces, DispatchCreatedPieces] = useReducer(
    CreatedPieceReducer,
    []
  );

  function CreatedPieceReducer(
    state: PiecePlaneViewModel[],
    action: CreatedPiecesAction
  ) {
    switch (action.type) {
      case "delete": {
        return state.filter(
          (item) => item.PiecePlane.id !== action.payload.PiecePlane.id
        );
      }

      case "add": {
        return [...state, action.payload];
      }
      case "move": {
        return state.map((item) => {
          if (item.PiecePlane.id === action.payload.piece.PiecePlane.id) {
            item.PiecePlane.position = action.payload.position;
            return item;
          } else return item;
        });
      }

      default:
        return state;
    }
  }

  return { createdPieces, DispatchCreatedPieces };
};
