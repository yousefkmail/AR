import { IDataService } from "../DataService/IDataService";
import { Basis } from "../DataService/Models/BasisModel";
import { Piece } from "../DataService/Models/PieceModel";
import {
  TemplateDataModel,
  TemplateModel,
} from "../DataService/Models/TemplateModel";
import {
  GetAllPiecee,
  GetAllBasis,
  GetAllTemplates,
  GetTemplateById,
  GetBaseById,
  GetPieceById,
} from "./ContentfulClient";
import { Layer } from "./Types/BasisType";
import { TemplateData } from "./Types/TemplateType";
export class ContentfulDataService implements IDataService {
  GetTemplateById: (assetId: string) => Promise<TemplateModel> = async (
    id: string
  ) => {
    const data = await GetTemplateById(id);

    const templateData: TemplateData = data.fields.data as TemplateData;

    const base = await GetBaseById(templateData.baseAssetId);

    const children = await Promise.all(
      templateData.children.map((item) => {
        return GetPieceById(item.pieceId);
      })
    );

    for (let item of templateData.children) {
      item.data = children.filter((itemm) => itemm.sys.id === item.pieceId)[0];
    }

    const model: TemplateModel = {
      id: data.sys.id,
      data: data.fields.data,
      name: data.fields.name,
      previewImage: data.fields.preview?.fields.file?.url ?? "",
      price: data.fields.price,
      description: "",
      loadedData: {
        basis: {
          price: 0,
          description: "",
          height: base.fields.height,
          name: base.fields.name,
          previewImage: base.fields.texture?.fields.file?.url ?? "",
          width: base.fields.width,
          id: base.sys.id,
          layers: (base.fields.layers as Layer[]).map((base) => ({
            name: base.name,
            positionOffset: base.positionOffset,
          })),
        },
        children: templateData.children.map((item) => ({
          layer: item.layer,
          position: item.position,
          data: {
            id: item.data.sys.id,
            baseOffset: item.data.fields.baseOffset,
            baseWidth: item.data.fields.baseWidth,
            category: item.data.fields.category,
            height: item.data.fields.height,
            name: item.data.fields.name,
            previewImage: item.data.fields.texture?.fields.file?.url ?? "",
            width: item.data.fields.width,
          },
        })),
      } as TemplateDataModel,
      tags: data.fields.tags,
    };

    return model;
  };

  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[TemplateModel[], number]> = async (page, pageSize) => {
    const data = await GetAllTemplates(page, pageSize);

    const bases: TemplateModel[] = [];

    data.items.forEach((base) => {
      bases.push({
        name: base.fields.name,
        previewImage: base.fields.preview?.fields.file?.url ?? "",
        tags: base.fields.tags,
        price: base.fields.price,
        id: base.sys.id,
        data: base.fields.data as TemplateData,
        description: "",
      });
    });

    return [bases, data.total];
  };
  GetAllBasis: () => Promise<Basis[]> = async () => {
    const data = await GetAllBasis();

    const bases: Basis[] = [];

    data.items.forEach((base) => {
      const modelbase: Basis = {
        height: base.fields.height,
        description: "",
        price: base.fields.price,
        name: base.fields.name,
        previewImage: base.fields.texture?.fields.file?.url ?? "",
        width: base.fields.width,
        id: base.sys.id,

        layers: (base.fields.layers as Layer[]).map((base) => ({
          name: base.name,
          width: 0,
          positionOffset: base.positionOffset,
        })),
      };

      bases.push(modelbase);
    });

    return bases;
  };
  GetAllPieces: () => Promise<Piece[]> = async () => {
    const data = await GetAllPiecee();

    const bases: Piece[] = [];

    data.items.forEach((base) => {
      const modelbase: Piece = {
        height: base.fields.height,
        name: base.fields.name,
        previewImage: base.fields.texture?.fields.file?.url ?? "",
        width: base.fields.width,
        baseOffset: base.fields.baseOffset,
        baseWidth: base.fields.baseWidth,
        id: base.sys.id,
        category: base.fields.category,
        price: base.fields.price,
        isFlipable: base.fields.isFlipable,
        description: "",
      };

      bases.push(modelbase);
    });

    return bases;
  };
}
