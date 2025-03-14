import PageWidthLayout from "@components/Layout/PageWidthLayout";
import { useTeamMembers } from "@hooks/SiteData/useTeamMembers";
import HomePersonProfile from "./HomePersonProfile";
import { TeamMembersSkeleton } from "./TeamMembersSkeleton";

export const TeamMembers = () => {
  const { TeamMembers, isLoading } = useTeamMembers();

  if (isLoading) return <TeamMembersSkeleton />;

  return (
    <PageWidthLayout maxWidth={1600}>
      <div className="mx-sm my-xl">
        <h1 className="txt-center mb-lg">Our Team</h1>
        <div className="flex-center-wrap">
          {TeamMembers?.map((member, index) => (
            <HomePersonProfile
              key={index}
              img={member.profilePicture}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </PageWidthLayout>
  );
};
