import { AboutSectionType } from "../../Lib/Contentful/Types/AboutSectionType";
import { TeamMemberType } from "../../Lib/Contentful/Types/TeamMemberType";
import { GlobalSettingsType } from "../../Lib/Contentful/Types/GlobalSettingsType";
import { ContentfulCleint } from "@lib/Contentful/Client";

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
