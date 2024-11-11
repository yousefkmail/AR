import { IDataService } from "../DataService/IDataService";
import { BasisModel } from "../Models/BasisModel";
import { PieceModel } from "../Models/PieceModel";
import { TemplateModel } from "../Models/TemplateMode";
import { GetAllPiecee, GetAllBasis, GetAllTemplates } from "./ContentfulClient";
export class ContentfulDataService implements IDataService {
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[TemplateModel[], number]> = async (page, pageSize) => {
    const data = await GetAllTemplates(page, pageSize);

    const items: TemplateModel[] = [];
    data.items.forEach((item) => {
      items.push({
        name: item.fields.name,
        preview: item.fields.preview?.fields.file?.url ?? "",
        tags: item.fields.tags,
      });
    });

    return [items, data.total];
  };
  GetAllBasis: () => Promise<BasisModel[]> = async () => {
    const data = await GetAllBasis();

    const items: BasisModel[] = [];

    data.items.forEach((item) => {
      const modelItem: BasisModel = {
        height: item.fields.height,
        name: item.fields.name,
        texture: item.fields.texture?.fields.file?.url ?? "",
        width: item.fields.width,
        assetId: item.sys.id,
      };

      items.push(modelItem);
    });

    return items;
  };
  GetAllPieces: () => Promise<PieceModel[]> = async () => {
    const data = await GetAllPiecee();

    const items: PieceModel[] = [];

    data.items.forEach((item) => {
      const modelItem: PieceModel = {
        height: item.fields.height,
        name: item.fields.name,
        texture: item.fields.texture?.fields.file?.url ?? "",
        width: item.fields.width,
        baseOffset: item.fields.baseOffset,
        baseWidth: item.fields.baseWidth,
        assetId: item.sys.id,
        category: item.fields.category,
      };

      items.push(modelItem);
    });

    return items;
  };
}
