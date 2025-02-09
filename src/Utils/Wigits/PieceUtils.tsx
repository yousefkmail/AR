import { Piece } from "../../Data/Models/Piece";
import { PieceChild } from "../../Data/Models/TemplateModel";

export const GetPieceRight: (piece: Piece) => number = (piece: Piece) => {
  if (piece.isFlipped) {
    return piece.width / 2 - piece.baseOffset;
  } else return -piece.width / 2 + piece.baseWidth + piece.baseOffset;
};

export const GetPieceLeft: (piece: Piece) => number = (piece: Piece) => {
  if (piece.isFlipped) {
    return piece.width / 2 - piece.baseWidth - piece.baseOffset;
  } else return piece.width / 2 - piece.baseOffset;
};

export const GetPieceMostRight = (piece: PieceChild) => {
  return piece.position[0] + piece.piece.width / 100;
};

export const GetPieceMostLeft = (piece: PieceChild) => {
  return piece.position[0] - piece.piece.width / 100;
};
