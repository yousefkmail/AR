import { AboutSection } from "@data/AboutSectionModel";
import { GlobalSettings } from "@data/GlobalSettings";
import { TeamMemberModel } from "@data/TeamMemberModel";

export interface ISiteDataService {
  GetAboutSections: () => Promise<AboutSection[]>;
  GetTeamMembers: () => Promise<TeamMemberModel[]>;
  GetGlobalSettings: () => Promise<GlobalSettings>;
}
