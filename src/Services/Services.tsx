import { ISiteDataService } from "./Interfaces/ISiteDataService";
import { ContentfulSiteDataService } from "./Contentful/ContentfulSiteDataService";
import { IPieceService } from "./Interfaces/IPieceService";
import { FirebasePieceService } from "./Firebase/FirebasePieceService";
import { IBasisService } from "./Interfaces/IBasisService";
import { FirebaseBasisService } from "./Firebase/FirebaseBasisService";
import { ITemplateService } from "./Interfaces/ITemplateService";
import { FirebaseTemplateService } from "./Firebase/FirebaseTemplateService";

export const pieceService: IPieceService = FirebasePieceService;
export const basisService: IBasisService = FirebaseBasisService;
export const templateService: ITemplateService = FirebaseTemplateService;
export const siteDataService: ISiteDataService =
  new ContentfulSiteDataService();
