import Skeleton from "react-loading-skeleton";

export default function HomeAboutSectionSkeleton() {
  return (
    <div className={"about-section-container overflow-hidden relative "}>
      <div
        className={"about-section-split"}
        style={{ flexGrow: "1", width: "100%" }}
      >
        <Skeleton width={150} height={20} style={{ margin: "30px 0" }} />

        {Array(8)
          .fill(0)
          .map(() => (
            <Skeleton width={"100%"} height={10} />
          ))}
      </div>
      <div className={"about-section-split "} style={{ width: "100%" }}>
        <Skeleton width={"100%"} style={{ aspectRatio: "5/4" }} />
      </div>
    </div>
  );
}
