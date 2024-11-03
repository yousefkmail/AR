import Skeleton, { SkeletonProps } from "react-loading-skeleton";

interface PremadeTemplatesSkeletonProps extends SkeletonProps {
  count: number;
}
export default function PremadeTemplatesSkeleton(
  props: PremadeTemplatesSkeletonProps
) {
  return (
    <>
      {Array(props.count)
        .fill(0)
        .map((item) => (
          <div style={{ padding: "10px" }}>
            <Skeleton width={300} height={300}></Skeleton>
            <Skeleton width={100}></Skeleton>
            <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
              <Skeleton width={50} height={20}></Skeleton>
              <Skeleton width={50} height={20}></Skeleton>
            </div>
          </div>
        ))}
    </>
  );
}
