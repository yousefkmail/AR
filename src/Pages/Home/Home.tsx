import PageWidthLayout from "../../Layout/PageWidthLayout";
import HomeAboutSection from "./HomeAboutSection";
import HomePersonProfile from "./HomePersonProfile";
import { AboutSection } from "../../Data/Models/AboutSectionModel";
import HomeAboutSkeleton from "./HomeAboutSkeleton";
import HomePersonProfileSkeleton from "./HomePersonProfileSkeleton";
import Skeleton from "react-loading-skeleton";
import { useContentful } from "@cms";
export default function Home() {
  const { AboutSecionts, Members } = useContentful();
  return (
    <div className="pt-sm">
      {AboutSecionts.isLoading ? (
        <HomeAboutSkeleton sectionsCount={2} />
      ) : (
        AboutSecionts.data
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

      {AboutSecionts.isLoading || Members.isLoading ? (
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
              {Members.data?.map((member, index) => (
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
