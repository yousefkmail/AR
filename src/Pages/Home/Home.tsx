import { AboutSections } from "./AboutSections";
import { TeamMembers } from "./TeamMembers";

export default function Home() {
  return (
    <div className="pt-sm">
      <AboutSections />
      <TeamMembers />
    </div>
  );
}
