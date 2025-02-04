export default function OrderSectionField({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div style={{ padding: "10px 0" }}>
      <span style={{ fontWeight: "bolder" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
