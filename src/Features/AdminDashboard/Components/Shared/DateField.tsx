import { FunctionField } from "react-admin";

interface PriceFieldProps {
  source: string;
}
export function DateField({ source }: PriceFieldProps) {
  return (
    <FunctionField
      label={source.toLocaleUpperCase()}
      render={(record) => {
        if (record?.[source]) {
          return (record?.[source] as Date).toLocaleDateString?.("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
        return "";
      }}
    />
  );
}
