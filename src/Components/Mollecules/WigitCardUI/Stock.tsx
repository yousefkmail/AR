interface WigitCardStockProps {
  stock: number;
}
export default function Stock({ stock }: WigitCardStockProps) {
  return (
    <div style={{ color: "var(--accent-color)" }}>
      <span> {stock}</span>
      <span>{" in stock"}</span>
    </div>
  );
}
