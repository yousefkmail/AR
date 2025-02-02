import { useQuery } from "@tanstack/react-query";
import PageWidthLayout from "../../Layout/PageWidthLayout";
import HomeAboutSection from "./HomeAboutSection";
import HomePersonProfile from "./HomePersonProfile";
import { AboutSection } from "../../DataService/Models/AboutSectionModel";
import HomeAboutSkeleton from "./HomeAboutSkeleton";
import HomePersonProfileSkeleton from "./HomePersonProfileSkeleton";
import Skeleton from "react-loading-skeleton";
import {
  GetAboutSections,
  GetTeamMembers,
} from "../../Contentful/ContentfulClient";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["aboutSections"],
    queryFn: async () => {
      const sections = await GetAboutSections();
      return sections.map((item) => {
        return {
          description: item.fields.description,
          grayBackground: item.fields.grayBackground,
          id: item.fields.id,
          image: item.fields.previewImage?.fields.file?.url ?? "",
          label: item.fields.label,
          leftDirection: item.fields.leftDirection,
          order: item.fields.order,
        };
      });
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const members = await GetTeamMembers();
      return members.map((item) => {
        return {
          name: item.fields.name,
          profilePicture: item.fields.profilePicture?.fields.file?.url ?? "",
          role: item.fields.role,
        };
      });
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
            <div className="home-memebers-skeleton-header">
              <Skeleton width={150} height={30} />
            </div>

            <div className="flex-center-wrap">
              {Array(2)
                .fill(0)
                .map((_item, index) => (
                  <HomePersonProfileSkeleton
                    key={index}
                  ></HomePersonProfileSkeleton>
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
