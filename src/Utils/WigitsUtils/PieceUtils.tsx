import { Piece } from "../../DataService/Models/PieceModel";

export const GetPieceRight: (piece: Piece) => number = (piece: Piece) => {
  if (piece.isFlipable) {
    return piece.width / 2 - piece.baseOffset;
  } else return -piece.width / 2 + piece.baseWidth + piece.baseOffset;
};

export const GetPieceLeft: (piece: Piece) => number = (piece: Piece) => {
  if (piece.isFlipped) {
    return piece.width / 2 - piece.baseWidth - piece.baseOffset;
  } else return piece.width / 2 - piece.baseOffset;
};
