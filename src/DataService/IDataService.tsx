import { BasisModel } from "../Models/BasisModel";
import { PieceModel } from "../Models/PieceModel";
import { TemplateModel } from "../Models/TemplateMode";

export interface IDataService {
  GetAllBasis: () => Promise<BasisModel[]>;
  GetAllPieces: () => Promise<PieceModel[]>;
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[TemplateModel[], number]>;
}
