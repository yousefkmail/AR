import HomeAboutSectionSkeleton from "./HomeAboutSectionSkeleton";

interface HomeAboutSkeletonProps {
  sectionsCount: number;
}
export default function HomeAboutSkeleton({
  sectionsCount,
}: HomeAboutSkeletonProps) {
  return (
    <div>
      {Array(sectionsCount)
        .fill(0)
        .map(() => (
          <HomeAboutSectionSkeleton></HomeAboutSectionSkeleton>
        ))}
    </div>
  );
}
