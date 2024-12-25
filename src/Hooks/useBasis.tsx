import { Vector3 } from "three";
import { BasisPlaneViewModel } from "../Core/Viewmodels/BasisPlaneViewModel";
import { PiecePlaneViewModel } from "../Core/Viewmodels/PiecePlaneViewModel";
import { useReducer } from "react";
import { BasisPlane } from "../Core/BasisPlane";

export type CreatedBasisAction =
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
    }
  | {
      type: "move_child";
      payload: { piece: PiecePlaneViewModel; position: Vector3 };
    }
  | {
      type: "delete_child";
      payload: { piece: PiecePlaneViewModel };
    }
  | { type: "flip_child"; payload: { piece: PiecePlaneViewModel } };

export const useBasis = () => {
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
        return state.filter((item) => item.id !== action.payload.id);
      }

      case "changeLayer": {
        return state.map((parent) => {
          const plane = new BasisPlane({ ...parent.BasisPlane });
          const planeViewModel = new BasisPlaneViewModel(plane);

          plane.layers = parent.BasisPlane.layers;
          planeViewModel.children = parent.children;

          planeViewModel.UpdateChildLayer(
            action.payload.piece,
            action.payload.layer
          );
          planeViewModel.BasisPlane.position = parent.BasisPlane.position;
          planeViewModel.BasisPlane.rotation = parent.BasisPlane.rotation;
          return planeViewModel;
        });
      }
      case "deattach_piece": {
        let result = state.map((item) => {
          if (item.id === action.payload.parent?.id) {
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
          if (item.id === action.payload.basis.id) {
            item.BasisPlane.position = action.payload.position;
            return item;
          } else return item;
        });
      }

      case "move_child": {
        return state.map((item) => {
          let result = item.children.map((child) => {
            if (child.child.id === action.payload.piece.id) {
              child.child.PiecePlane.position = action.payload.position;
              return child;
            } else return child;
          });

          item.children = result;
          return item;
        });
      }

      case "delete_child": {
        return state.map((item) => {
          item.children = item.children.filter(
            (child) =>
              child.child.PiecePlane.id !== action.payload.piece.PiecePlane.id
          );
          return item;
        });
      }

      case "flip_child": {
        return state;
        // return state.map((item) => {
        //   if (
        //     item.children.filter(
        //       (child) =>
        //         child.child.PiecePlane.id === action.payload.piece.PiecePlane.id
        //     ).length > 0
        //   ) {
        //     item.children = item.children.map((child) => {
        //       if (
        //         child.child.PiecePlane.id === action.payload.piece.PiecePlane.id
        //       ) {
        //         child.child.isFlipped = !child.child.isFlipped;
        //         const newChildPlane = new PiecePlane(
        //           child.child.PiecePlane,
        //           child.child.PiecePlane.id
        //         );
        //         newChildPlane.position = child.child.PiecePlane.position;
        //         newChildPlane.rotation = child.child.PiecePlane.rotation;
        //         const planeViewModel = new PiecePlaneViewModel(newChildPlane);

        //         const newChild = new LayeredChild(
        //           planeViewModel,
        //           child.layerIndex
        //         );
        //         newChild.child.isFlipped = !newChild.child.isFlipped;
        //         return newChild;
        //       } else {
        //         return child;
        //       }
        //     });

        //     const newItem = new BasisPlaneViewModel(
        //       new BasisPlane(item.BasisPlane, item.BasisPlane.id)
        //     );
        //     newItem.children = item.children;

        //     return newItem;
        //   } else {
        //     return item;
        //   }
        // });
      }

      case "set": {
        return action.payload;
      }

      default:
        return state;
    }
  }

  return { createdBasis, DispatchCreatedBasis };
};
