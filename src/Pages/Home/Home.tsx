import { useQuery } from "@tanstack/react-query";
import PageWidthLayout from "../../Layout/PageWidthLayout";
import HomeAboutSection from "./HomeAboutSection";
import HomePersonProfile from "./HomePersonProfile";
import { dataService } from "../../Services/Services";
import { AboutSection } from "../../DataService/Models/AboutSectionModel";

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
    <div style={{ paddingTop: "30px" }}>
      {!isLoading ? (
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
      ) : (
        <div style={{ height: "600px" }}></div>
      )}

      {!isLoading && !membersLoading ? (
        <PageWidthLayout maxWidth={1600}>
          <div style={{ margin: "100px 20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "60px" }}>
              Our Team
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {members?.map((member) => (
                <HomePersonProfile
                  img={member.profilePicture}
                  name={member.name}
                  role={member.role}
                />
              ))}
            </div>
          </div>
        </PageWidthLayout>
      ) : (
        <div style={{ height: "600px" }}></div>
      )}
    </div>
  );
}
