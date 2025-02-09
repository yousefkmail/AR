import { useQuery } from "@tanstack/react-query";
import { GetAboutSections, GetTeamMembers } from "../Api/ContentfulClient";

export const useContentful = () => {
  const { data: aboutSectionsData, isLoading: aboutSectionsLoading } = useQuery(
    {
      queryKey: ["aboutSections"],
      queryFn: async () => {
        const sections = await GetAboutSections();
        sections[0].fields.previewImage;
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
    }
  );

  const { data: membersData, isLoading: membersLoading } = useQuery({
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

  return {
    AboutSecionts: { data: aboutSectionsData, isLoading: aboutSectionsLoading },
    Members: { data: membersData, isLoading: membersLoading },
  };
};
