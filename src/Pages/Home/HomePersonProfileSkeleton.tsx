import Skeleton from "react-loading-skeleton";

export default function HomePersonProfileSkeleton() {
  return (
    <div className="m-sm">
      <div>
        <Skeleton borderRadius={"50%"} width={200} height={200} />
      </div>
      <div>
        <Skeleton width={150} height={20} style={{ marginTop: "20px" }} />
        <Skeleton width={80} height={20} style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
}
