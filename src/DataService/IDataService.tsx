import { AboutSection } from "./Models/AboutSectionModel";
import { Basis } from "./Models/BasisModel";
import { GlobalSettings } from "./Models/GlobalSettings";
import { Piece } from "./Models/PieceModel";
import { ProductItem } from "./Models/ProductItem";
import { TeamMemberModel } from "./Models/TeamMemberModel";
import { TemplateModel, UnresolvedTemplateModel } from "./Models/TemplateModel";

export interface IDataService {
  GetAllBasis: () => Promise<Basis[]>;
  GetAllPieces: () => Promise<Piece[]>;
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[UnresolvedTemplateModel[], number]>;

  GetTemplateById: (assetId: string) => Promise<TemplateModel>;

  GetPiecesById: (assetIds: string[]) => Promise<ProductItem[]>;

  GetAboutSections: () => Promise<AboutSection[]>;

  GetTeamMembers: () => Promise<TeamMemberModel[]>;

  GetGlobalSettings: () => Promise<GlobalSettings>;
}
