import { useRecordContext } from "react-admin";

export const ItemDescriptionField = ({ source }: { source: string }) => {
  const record = useRecordContext();

  return <p>{record?.[source]}</p>;
};
