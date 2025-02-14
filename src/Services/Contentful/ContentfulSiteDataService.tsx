import { AboutSection } from "@data/AboutSectionModel";
import { TeamMemberModel } from "@data/TeamMemberModel";
import { ISiteDataService } from "../Interfaces/ISiteDataService";
import {
  GetAboutSections,
  GetGlobalSettings,
  GetTeamMembers,
} from "./ContentfulClient";
import { GlobalSettings } from "@data/GlobalSettings";

export class ContentfulSiteDataService implements ISiteDataService {
  GetGlobalSettings: () => Promise<GlobalSettings> = async () => {
    const data = await GetGlobalSettings();
    return {
      logo: data.fields.logo?.fields.file?.url ?? "",
      preview: data.fields.preview?.fields.file?.url ?? "",
      siteName: data.fields.siteName,
    };
  };

  GetAboutSections: () => Promise<AboutSection[]> = async () => {
    const sections = await GetAboutSections();
    sections[0].fields.previewImage;
    return sections.map((item) => {
      return {
        description: item.fields.description,
        grayBackground: item.fields.grayBackground,
        id: item.sys.id,
        image: item.fields.previewImage?.fields.file?.url ?? "",
        label: item.fields.label,
        leftDirection: item.fields.leftDirection,
        order: item.fields.order,
      };
    });
  };

  GetTeamMembers: () => Promise<TeamMemberModel[]> = async () => {
    const members = await GetTeamMembers();
    return members.map((item) => {
      return {
        name: item.fields.name,
        profilePicture: item.fields.profilePicture?.fields.file?.url ?? "",
        role: item.fields.role,
      };
    });
  };
}
