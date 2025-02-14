import { TemplateModel, UnresolvedTemplateModel } from "@core";

export interface ITemplateService {
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[UnresolvedTemplateModel[], number]>;

  GetTemplateById: (assetId: string) => Promise<TemplateModel>;
}
