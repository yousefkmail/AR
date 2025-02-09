import { useRecordContext } from "react-admin";
import { camelCaseToLabel } from "../../../../Utils/Text/CamelCaseToLabel";

export const ItemNumberField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <div
      style={{
        flexGrow: "1",
        backgroundColor: "#fafafb",
        margin: "4px",
        borderRadius: "7px",
        padding: "4px",
      }}
    >
      <div>{camelCaseToLabel(source)}</div>
      <div>{record?.[source]}</div>
    </div>
  );
};
