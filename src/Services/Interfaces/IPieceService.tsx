import { Piece } from "@core/index";

export interface IPieceService {
  getAllPieces: () => Promise<Piece[]>;
  getPieceById: (id: string) => Promise<Piece | null>;
  getPiecesByIds: (ids: string[]) => Promise<Piece[]>;
}
