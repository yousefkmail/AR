import { AboutSection } from "../Models/AboutSectionModel";
import { Basis } from "../Models/Basis";
import { GlobalSettings } from "@data/Models/GlobalSettings";
import { Piece } from "../Models/Piece";
import { ProductItem } from "../Models/ProductItem";
import { TeamMemberModel } from "../Models/TeamMemberModel";
import {
  TemplateModel,
  UnresolvedTemplateModel,
} from "../Models/TemplateModel";

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
