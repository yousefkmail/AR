import { useEffect, useReducer } from "react";
import { PieceObject } from "../Core/PiecePlane";

export type CreatedPiecesAction =
  | { type: "add"; payload: PieceObject }
  | { type: "delete"; payload: PieceObject }
  | { type: "set"; payload: PieceObject[] }
  | {
      type: "move";
      payload: { piece: PieceObject; position: [number, number, number] };
    }
  | { type: "flip"; payload: { piece: PieceObject } };

export const usePieces = () => {
  const [createdPieces, DispatchCreatedPieces] = useReducer(
    CreatedPieceReducer,
    []
  );

  function CreatedPieceReducer(
    state: PieceObject[],
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
            item.position = action.payload.position;
            return item;
          } else return item;
        });
      }

      case "flip": {
        return state.map((item) => {
          if (item.id === action.payload.piece.id && item.piece.isFlipable) {
            const newItem: PieceObject = { ...item };
            newItem.piece = { ...item.piece };
            newItem.piece.isFlipped = !newItem.piece.isFlipped;
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
