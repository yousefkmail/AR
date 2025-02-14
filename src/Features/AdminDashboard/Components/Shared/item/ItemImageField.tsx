import { useRecordContext } from "react-admin";

export const ItemImageField = ({ source }: { source: string }) => {
  const record = useRecordContext();

  return (
    <div
      style={{
        backgroundColor: "rgb(238, 238, 238)",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <img
        style={{ height: "200px", maxWidth: "600px" }}
        src={record?.[source]}
      />
    </div>
  );
};
