import { createClient } from "contentful";
import { AboutSectionType } from "./Types/AboutSectionType";
import { TeamMemberType } from "./Types/TeamMemberType";
import { GlobalSettingsType } from "./Types/GlobalSettingsType";

export const ContentfulCleint = createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  host: import.meta.env.VITE_CONTENTFUL_HOST,
});

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

export const GetGlobalSettings = async () => {
  const data =
    await ContentfulCleint.withoutUnresolvableLinks.getEntries<GlobalSettingsType>(
      { limit: 1, content_type: "globalSettings" }
    );

  return data.items[0];
};
