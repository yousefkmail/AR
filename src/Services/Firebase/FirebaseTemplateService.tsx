import {
  Basis,
  Piece,
  PieceChild,
  TemplateModel,
  UnresolvedTemplateModel,
} from "@core";
import { ITemplateService } from "../Interfaces/ITemplateService";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@lib/Firebase/App";
import { FirebaseDataProvider } from "./FirebaseDataProvider";

export const FirebaseTemplateService: ITemplateService = {
  async GetAllTemplates(
    _page: number,
    _pageSize: number
  ): Promise<[UnresolvedTemplateModel[], number]> {
    const dataProidiver = new FirebaseDataProvider();
    const docs = await dataProidiver.getList("templates", {
      pagination: { page: _page, perPage: _pageSize },
      sort: { field: "createdAt", order: "ASC" },
    });
    console.log(docs);
    return [docs.data, docs.total];
  },

  async GetTemplateById(assetId: string): Promise<TemplateModel> {
    const template = await getDoc(doc(firestore, "templates", assetId));

    const unresolvedTemplate: UnresolvedTemplateModel = {
      ...(template.data() as UnresolvedTemplateModel),
      id: template.id,
    };

    const base = await getDoc(unresolvedTemplate.base);

    const results = await Promise.all(
      unresolvedTemplate.children.map(async (child) => {
        const resolvedChild = await getDoc(child.piece);

        const finalResult: PieceChild = {
          id: child.id,
          layer: child.layer,
          piece: { ...(resolvedChild.data() as Piece), id: resolvedChild.id },
          position: child.position,
        };
        return finalResult;
      })
    );

    const resolvedTemplate: TemplateModel = {
      id: unresolvedTemplate.id,
      base: base.data() as Basis,
      pieces: results,
      price: unresolvedTemplate.price,
      description: unresolvedTemplate.description,
      name: unresolvedTemplate.name,
      previewImage: unresolvedTemplate.previewImage,
      createdAt: unresolvedTemplate.createdAt,
      updatedAt: unresolvedTemplate.updatedAt,
    };

    return resolvedTemplate;
  },
};
