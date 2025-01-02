import { createClient } from "contentful";
import { CollectionTemplate } from "./Types/TemplateType";
import { BasisType } from "./Types/BasisType";
import { PieceType } from "./Types/PieceeType";
import { AboutSectionType } from "./Types/AboutSectionType";
import { TeamMemberType } from "./Types/TeamMemberType";

export const ContentfulCleint = createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  host:
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? "cdn.contentful.com"
      : "preview.contentful.com",
});

export const GetAllTemplates = async (page: number, pageSize: number) => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<CollectionTemplate>(
      {
        content_type: "collectionTemplate",
        limit: pageSize,
        skip: (page - 1) * pageSize,
      }
    );
  return data;
};

export const GetAllBasis = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<BasisType>({
      content_type: "basis",
    });
  return data;
};

export const GetBaseById = async (id: string) => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntry<BasisType>(id);

  return data;
};

export const GetPieceById = async (id: string) => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntry<PieceType>(id);

  return data;
};

export const GetAllPiecee = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<PieceType>({
      content_type: "piecee",
    });
  return data;
};

export const GetTemplateById = async (id: string) => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntry<CollectionTemplate>(
      id
    );

  return data;
};

export const GetPiecesByIds = async (ids: string[]) => {
  const data = await ContentfulCleint.withoutUnresolvableLinks.getEntries({
    "sys.id[in]": ids,
  });

  return data.items;
};

export const GetAboutSections = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<AboutSectionType>(
      { content_type: "aboutSection" }
    );

  return data.items;
};

export const GetTeamMembers = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<TeamMemberType>({
      content_type: "teamMember",
    });

  return data.items;
};
