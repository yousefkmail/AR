import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IDataService } from "@data/DataService/IDataService";
import {
  AboutSection,
  Basis,
  Piece,
  GlobalSettings,
  ProductItem,
  TeamMemberModel,
  PieceChild,
  TemplateModel,
  UnresolvedTemplateModel,
} from "@data/Models";
import { firestore } from "../Firebase/firebaseApp";

export class BackendDataService implements IDataService {
  GetAllBasis: () => Promise<Basis[]> = async () => {
    const docs = await getDocs(collection(firestore, "bases"));
    return docs.docs.map((item) => {
      return { ...(item.data() as Basis), id: item.id };
    });
  };

  GetAllPieces: () => Promise<Piece[]> = async () => {
    const docs = await getDocs(collection(firestore, "pieces"));
    return docs.docs.map((item) => {
      return { ...(item.data() as Piece), id: item.id };
    });
  };
  GetAllTemplates: (
    page: number,
    pageSize: number
  ) => Promise<[UnresolvedTemplateModel[], number]> = async () => {
    const docs = await getDocs(collection(firestore, "templates"));

    return [
      docs.docs.map((item) => {
        return { ...(item.data() as UnresolvedTemplateModel), id: item.id };
      }),
      docs.size,
    ];
  };

  GetTemplateById: (assetId: string) => Promise<TemplateModel> = async (
    assetId: string
  ) => {
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
      children: results,
      price: unresolvedTemplate.price,
      description: unresolvedTemplate.description,
      name: unresolvedTemplate.name,
      previewImage: unresolvedTemplate.previewImage,
      createdAt: unresolvedTemplate.createdAt,
      updatedAt: unresolvedTemplate.updatedAt,
    };

    return resolvedTemplate;
  };

  GetPiecesById: (assetIds: string[]) => Promise<ProductItem[]> = async () => {
    return [];
  };
  GetAboutSections: () => Promise<AboutSection[]> = async () => {
    return [];
  };
  GetTeamMembers: () => Promise<TeamMemberModel[]> = async () => {
    return [];
  };
  GetGlobalSettings: () => Promise<GlobalSettings> = async () => {
    const docRef = doc(firestore, "globalSettings", "mainSettings");
    const docSnapshot = await getDoc(docRef);

    return docSnapshot.data() as GlobalSettings;
  };
}
