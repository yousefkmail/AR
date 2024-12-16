import { BasisModel } from "./Models/BasisModel";
import { PieceModel } from "./Models/PieceModel";
import { TemplateModel } from "./Models/TemplateModel";

export interface IDataService {
  GetAllBasis: () => Promise<BasisModel[]>;
  GetAllPieces: () => Promise<PieceModel[]>;
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[TemplateModel[], number]>;

  GetTemplateById: (assetId: string) => Promise<TemplateModel>;
}
