import { useQuery } from "@tanstack/react-query";
import { GetGlobalSettings } from "../Contentful/ContentfulClient";

export const useGlobalSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["globalSettings"],
    queryFn: async () => {
      const data = await GetGlobalSettings();
      return {
        logo: data.fields.logo?.fields.file?.url,
        preview: data.fields.preview?.fields.file?.url,
        siteName: data.fields.siteName,
      };
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isLoading, data };
};
