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
    }
  | { type: "flip"; payload: { piece: PiecePlaneViewModel } };

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
        return state.filter((item) => item.id !== action.payload.id);
      }

      case "add": {
        return [...state, action.payload];
      }
      case "move": {
        return state.map((item) => {
          if (item.id === action.payload.piece.id) {
            item.PiecePlane.position = action.payload.position;

            return item;
          } else return item;
        });
      }

      case "flip": {
        return state.map((item) => {
          if (
            item.id === action.payload.piece.id &&
            item.PiecePlane.isFlipable
          ) {
            const newItem = new PiecePlaneViewModel(item.PiecePlane);
            newItem.isFlipped = !item.isFlipped;
            newItem.parent = item.parent;
            return newItem;
          } else return item;
        });
      }

      default:
        return state;
    }
  }

  return { createdPieces, DispatchCreatedPieces };
};
