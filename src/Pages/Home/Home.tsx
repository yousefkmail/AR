import HomeAboutSection from "./HomeAboutSection";
import HomePersonProfile from "./HomePersonProfile";
import { AboutSection } from "../../Data/AboutSectionModel";
import HomeAboutSkeleton from "./HomeAboutSkeleton";
import HomePersonProfileSkeleton from "./HomePersonProfileSkeleton";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { siteDataService } from "../../Services/Services";
import PageWidthLayout from "@components/Layout/PageWidthLayout";
import { useEffect } from "react";

export default function Home() {
  const { data: AboutSections, isLoading: AboutSectionsLoading } = useQuery({
    queryKey: ["aboutSections"],
    queryFn: siteDataService.GetAboutSections,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: TeamMembers, isLoading: TeamMembersLoading } = useQuery({
    queryKey: ["teamMembers"],

    queryFn: siteDataService.GetTeamMembers,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    console.log(TeamMembers);
  }, [TeamMembers]);

  return (
    <div className="pt-sm">
      {AboutSectionsLoading ? (
        <HomeAboutSkeleton sectionsCount={2} />
      ) : (
        AboutSections?.sort((a, b) => a.order - b.order).map(
          (section: AboutSection) => (
            <HomeAboutSection
              key={section.id}
              img={section.image}
              label={section.label}
              paragraph={section.description}
              direction={section.leftDirection ? "left" : "right"}
              background={section.grayBackground ? "secondary" : "primary"}
            />
          )
        )
      )}

      {AboutSectionsLoading || TeamMembersLoading ? (
        <PageWidthLayout maxWidth={1600}>
          <div className="mx-sm my-xl">
            <div className="home-memebers-skeleton-header">
              <Skeleton width={150} height={30} />
            </div>

            <div className="flex-center-wrap">
              {Array(2)
                .fill(0)
                .map((_item, index) => (
                  <HomePersonProfileSkeleton key={index} />
                ))}
            </div>
          </div>
        </PageWidthLayout>
      ) : (
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
      )}
    </div>
  );
}
