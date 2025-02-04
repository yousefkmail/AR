import { useRecordContext } from "react-admin";

export const ItemNameField = ({ source }: { source: string }) => {
  const record = useRecordContext();

  return <h1 style={{ marginBottom: "0" }}>{record?.[source]}</h1>;
};
