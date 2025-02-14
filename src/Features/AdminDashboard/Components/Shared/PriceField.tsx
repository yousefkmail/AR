import { FunctionField } from "react-admin";

interface PriceFieldProps {
  source: string;
}
export function PriceField({ source }: PriceFieldProps) {
  return (
    <FunctionField
      label="Price"
      render={(record) =>
        record?.[source] !== undefined
          ? `$${(record?.[source] / 100).toFixed(2)}`
          : "N/A"
      }
    />
  );
}
