import { IDataService } from "../DataService/IDataService";
import { AboutSection } from "../DataService/Models/AboutSectionModel";
import { Basis } from "../DataService/Models/BasisModel";
import { GlobalSettings } from "../DataService/Models/GlobalSettings";
import { Piece } from "../DataService/Models/PieceModel";
import { ProductItem } from "../DataService/Models/ProductItem";
import { TeamMemberModel } from "../DataService/Models/TeamMemberModel";
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
  GetPiecesByIds,
  GetAboutSections,
  GetTeamMembers,
  GetGlobalSettings,
} from "./ContentfulClient";
import { Layer } from "./Types/BasisType";
import { TemplateData } from "./Types/TemplateType";
export class ContentfulDataService implements IDataService {
  GetGlobalSettings: () => Promise<GlobalSettings> = async () => {
    const data = await GetGlobalSettings();
    return {
      logo: data.fields.logo?.fields.file?.url ?? "",
      siteName: data.fields.siteName,
      preview: data.fields.preview?.fields.file?.url ?? "",
    };
  };
  GetTeamMembers: () => Promise<TeamMemberModel[]> = async () => {
    const data = await GetTeamMembers();

    return data.map((item) => {
      return {
        name: item.fields.name,
        profilePicture: item.fields.profilePicture?.fields.file?.url ?? "",
        role: item.fields.role,
      };
    });
  };

  GetAboutSections: () => Promise<AboutSection[]> = async () => {
    const data = await GetAboutSections();
    console.log(data);
    return data.map((item) => {
      return {
        id: item.sys.id,
        grayBackground: item.fields.grayBackground,
        label: item.fields.label,
        leftDirection: item.fields.leftDirection,
        order: item.fields.order,
        description: item.fields.description,
        image: item.fields.previewImage?.fields.file?.url ?? "",
      };
    });
  };
  GetPiecesById: (assetIds: string[]) => Promise<ProductItem[]> = async (
    ids: string[]
  ) => {
    const data = await GetPiecesByIds(ids);

    return data.map((item) => {
      return {
        description: "",
        id: item.sys.id,
        name: item.fields.name as string,
        price: item.fields.price as number,
        previewImage: (item.fields.texture as any)?.fields.file?.url ?? "",
      };
    });
  };
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
          price: data.fields.price,
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
            price: item.data.fields.price,
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
