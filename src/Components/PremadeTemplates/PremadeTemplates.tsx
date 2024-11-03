import { useQuery } from "@tanstack/react-query";
import { GetAllTemplates } from "../../Contentful/ContentfulClient";
import CategoryTag from "../CategoryTag/CategoryTag";
import PremadeTemplatesSkeleton from "./PremadeTemplatesSkeleton";

export default function PremadeTemplates() {
  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      return await GetAllTemplates();
    },
  });

  return (
    <div style={{ padding: "0 48px" }}>
      <h2>Start from a template</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          padding: "10px",
        }}
      >
        {data ? (
          data?.items.map((item) => (
            <div style={{ padding: "10px" }}>
              <img
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
                src={item.fields.preview?.fields.file?.url}
                alt=""
              />
              <div style={{ margin: "15px 0" }}>{item.fields.name}</div>
              {item.fields.tags.map((item) => (
                <CategoryTag>{item}</CategoryTag>
              ))}
            </div>
          ))
        ) : (
          <PremadeTemplatesSkeleton count={5} />
        )}
      </div>
    </div>
  );
}
