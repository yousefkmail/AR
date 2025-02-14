import { useRecordContext } from "react-admin";

export const ItemStockField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>Stock:</div>
      <div style={{ fontSize: "1.2rem" }}>{record?.[source]}</div>
    </div>
  );
};
