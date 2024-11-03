import { createClient } from "contentful";
import { CollectionTemplate, Piece } from "./Types/PieceType";

export const ContentfulCleint = createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
});

export const GetAllPieces = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<Piece>({
      content_type: "piece",
    });
  return data;
};

export const GetAllTemplates = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<CollectionTemplate>(
      {
        content_type: "collectionTemplate",
      }
    );
  return data;
};
