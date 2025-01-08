import { useQuery } from "@tanstack/react-query";
import PageWidthLayout from "../../Layout/PageWidthLayout";
import HomeAboutSection from "./HomeAboutSection";
import HomePersonProfile from "./HomePersonProfile";
import { dataService } from "../../Services/Services";
import { AboutSection } from "../../DataService/Models/AboutSectionModel";
import HomeAboutSkeleton from "./HomeAboutSkeleton";
import HomePersonProfileSkeleton from "./HomePersonProfileSkeleton";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["aboutSections"],
    queryFn: async () => {
      return await dataService.GetAboutSections();
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      return await dataService.GetTeamMembers();
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <div className="pt-sm">
      {isLoading ? (
        <HomeAboutSkeleton sectionsCount={2} />
      ) : (
        data
          ?.sort((a, b) => a.order - b.order)
          .map((section: AboutSection) => (
            <HomeAboutSection
              key={section.id}
              img={section.image}
              label={section.label}
              paragraph={section.description}
              direction={section.leftDirection ? "left" : "right"}
              background={section.grayBackground ? "secondary" : "primary"}
            />
          ))
      )}

      {isLoading || membersLoading ? (
        <PageWidthLayout maxWidth={1600}>
          <div className="mx-sm my-xl">
            <div
              style={{
                display: "grid",
                placeItems: "center",
                marginBottom: "70px",
              }}
            >
              <Skeleton width={150} height={30} />
            </div>

            <div className="flex-center-wrap">
              {Array(2)
                .fill(0)
                .map(() => (
                  <HomePersonProfileSkeleton></HomePersonProfileSkeleton>
                ))}
            </div>
          </div>
        </PageWidthLayout>
      ) : (
        <PageWidthLayout maxWidth={1600}>
          <div className="mx-sm my-xl">
            <h1 className="txt-center mb-lg">Our Team</h1>
            <div className="flex-center-wrap">
              {members?.map((member, index) => (
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
      )}
    </div>
  );
}
