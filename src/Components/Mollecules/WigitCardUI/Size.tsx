interface WigitCardSizeProps {
  width: number;
  height: number;
}
export default function Size({ height, width }: WigitCardSizeProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <span> {width} </span>
        <span> X </span>
        <span> {height} </span>
        <span
          style={{
            borderRadius: "3px",
            marginLeft: "3px",
          }}
        >
          {"cm"}
        </span>
      </div>
    </div>
  );
}
