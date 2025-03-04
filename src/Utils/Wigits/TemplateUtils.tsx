import { TemplateObject } from "@core";
import { PieceChild } from "../../Core/Models/TemplateModel";

export const GetPieceChildNeighbours = (
  templateObject: TemplateObject,
  pieceChild: PieceChild
) => {
  let leftChild: PieceChild | null = null;
  let rightChild: PieceChild | null = null;

  for (let i = 0; i < templateObject.templateModel.pieces.length; i++) {
    const PiecePlaneData = templateObject.templateModel.pieces[i];
    if (
      PiecePlaneData.id !== pieceChild.id &&
      templateObject.templateModel.pieces[i].layer ===
        templateObject.templateModel.pieces.filter(
          (item) => item.id === pieceChild.id
        )[0].layer
    ) {
      if (pieceChild.position[0] - PiecePlaneData.position[0] > 0) {
        if (leftChild === null) {
          leftChild = templateObject.templateModel.pieces[i];
        }
        if (leftChild && PiecePlaneData.position[0] > leftChild.position[0]) {
          leftChild = templateObject.templateModel.pieces[i];
        }
      } else {
        if (rightChild === null) {
          rightChild = templateObject.templateModel.pieces[i];
        }

        if (rightChild && PiecePlaneData.position[0] < rightChild.position[0]) {
          rightChild = templateObject.templateModel.pieces[i];
        }
      }
    }
  }

  return [leftChild, rightChild];
};
