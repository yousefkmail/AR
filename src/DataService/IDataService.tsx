import { Basis } from "./Models/BasisModel";
import { Piece } from "./Models/PieceModel";
import { TemplateModel } from "./Models/TemplateModel";

export interface IDataService {
  GetAllBasis: () => Promise<Basis[]>;
  GetAllPieces: () => Promise<Piece[]>;
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[TemplateModel[], number]>;

  GetTemplateById: (assetId: string) => Promise<TemplateModel>;
}
