import { createClient } from "contentful";

export const ContentfulCleint = createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  host: import.meta.env.VITE_CONTENTFUL_HOST,
});
