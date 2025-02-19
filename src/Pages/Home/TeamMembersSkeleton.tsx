import Skeleton from "react-loading-skeleton";
import HomePersonProfileSkeleton from "./HomePersonProfileSkeleton";

export const TeamMembersSkeleton = () => {
  return (
    <>
      <div className="home-members-skeleton-header">
        <Skeleton width={150} height={30} />
      </div>
      <div className="flex-center-wrap">
        {Array(2)
          .fill(0)
          .map((_item, index) => (
            <HomePersonProfileSkeleton key={index} />
          ))}
      </div>
    </>
  );
};
