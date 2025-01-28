import { useReducer } from "react";
import { TemplateObject } from "../Core/Template";
import { PieceChild } from "../DataService/Models/TemplateModel";
import { PieceObject } from "../Core/PiecePlane";

export type createdTemplatesAction =
  | { type: "add"; payload: TemplateObject }
  | {
      type: "changeLayer";
      payload: { layer: number; piece: PieceChild };
    }
  | { type: "delete"; payload: TemplateObject }
  | { type: "deattach_piece"; payload: PieceChild }
  | { type: "set"; payload: TemplateObject[] }
  | {
      type: "move";
      payload: { basis: TemplateObject; position: [number, number, number] };
    }
  | {
      type: "move_child";
      payload: { piece: PieceChild; position: [number, number, number] };
    }
  | {
      type: "delete_child";
      payload: { piece: PieceChild };
    }
  | { type: "flip_child"; payload: { piece: PieceChild } }
  | {
      type: "add_child";
      payload: {
        piece: PieceObject;
        template: TemplateObject;
        position: [number, number, number];
        layer: number;
      };
    }
  | {
      type: "rotate";
      payload: {
        template: TemplateObject;
        rotation: [number, number, number];
      };
    };
export const useTemplateObjects = () => {
  const [createdTemplates, dispatchCreatedTemplates] = useReducer(
    createdTemplatesReducer,
    []
  );

  function createdTemplatesReducer(
    state: TemplateObject[],
    action: createdTemplatesAction
  ) {
    switch (action.type) {
      case "add": {
        return [...state, action.payload];
      }

      case "delete": {
        return state.filter((item) => item.id !== action.payload.id);
      }

      case "changeLayer": {
        return state.map((templateObject) => ({
          ...templateObject,
          templateModel: {
            ...templateObject.templateModel,
            children: templateObject.templateModel.children.map(
              (pieceChild) => ({
                ...pieceChild,
                layer:
                  pieceChild.id === action.payload.piece.id
                    ? action.payload.layer
                    : pieceChild.layer,
              })
            ),
          },
        }));
      }
      case "rotate": {
        return state.map((item) => {
          if (item.id === action.payload.template.id) {
            item.rotation = action.payload.rotation;
          }
          return item;
        });
      }
      case "add_child": {
        return state.map((item) => {
          if (item.id === action.payload.template.id) {
            const pieceChild: PieceChild = {
              piece: { ...action.payload.piece.piece },
              id: action.payload.piece.id,
              position: [action.payload.position[0], 0, 0],
              layer: action.payload.layer,
            };

            return {
              ...item,
              templateModel: {
                ...item.templateModel,
                children: [...item.templateModel.children, pieceChild],
              },
            };
          }
          return item;
        });
      }
      case "deattach_piece": {
        return state.map((item) => {
          item.templateModel.children = item.templateModel.children.filter(
            (child) => child.id !== action.payload.id
          );
          return item;
        });
      }

      case "move": {
        return state.map((item) => {
          if (item.id === action.payload.basis.id) {
            item.position = action.payload.position;
            return item;
          } else return item;
        });
      }

      case "move_child": {
        return state.map((item) => {
          let result = item.templateModel.children.map((child) => {
            if (child.id === action.payload.piece.id) {
              child.position = action.payload.position;
              return child;
            } else return child;
          });

          item.templateModel.children = result;
          return item;
        });
      }

      case "delete_child": {
        return state.map((item) => {
          item.templateModel.children = item.templateModel.children.filter(
            (child) => child.id !== action.payload.piece.id
          );
          return item;
        });
      }

      case "flip_child": {
        return state.map((item) => ({
          ...item,
          templateModel: {
            ...item.templateModel,
            children: item.templateModel.children.map((item) =>
              item.id === action.payload.piece.id
                ? {
                    ...item,
                    piece: { ...item.piece, isFlipped: !item.piece.isFlipped },
                  }
                : item
            ),
          },
        }));
      }

      case "set": {
        return action.payload;
      }

      default:
        return state;
    }
  }

  return { createdTemplates, dispatchCreatedTemplates };
};
