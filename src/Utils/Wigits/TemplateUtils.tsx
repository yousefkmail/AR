import { TemplateObject } from "../../Data/R3F/Template";
import { PieceChild } from "../../Data/Models/TemplateModel";

export const GetPieceChildNeighbours = (
  templateObject: TemplateObject,
  pieceChild: PieceChild
) => {
  let leftChild: PieceChild | null = null;
  let rightChild: PieceChild | null = null;

  for (let i = 0; i < templateObject.templateModel.children.length; i++) {
    const PiecePlaneData = templateObject.templateModel.children[i];
    if (
      PiecePlaneData.id !== pieceChild.id &&
      templateObject.templateModel.children[i].layer ===
        templateObject.templateModel.children.filter(
          (item) => item.id === pieceChild.id
        )[0].layer
    ) {
      if (pieceChild.position[0] - PiecePlaneData.position[0] > 0) {
        if (leftChild === null) {
          leftChild = templateObject.templateModel.children[i];
        }
        if (leftChild && PiecePlaneData.position[0] > leftChild.position[0]) {
          leftChild = templateObject.templateModel.children[i];
        }
      } else {
        if (rightChild === null) {
          rightChild = templateObject.templateModel.children[i];
        }

        if (rightChild && PiecePlaneData.position[0] < rightChild.position[0]) {
          rightChild = templateObject.templateModel.children[i];
        }
      }
    }
  }

  return [leftChild, rightChild];
};
