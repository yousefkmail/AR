import WigitFieldContainer from "./WigitFieldContainer";
import WigitFieldLabel from "./WigitFieldLabel";

type WigitsCardDimentionsFieldProps = {
  width: number;
  height: number;
  label?: string;
  unit?: string;
};
export default function WigitsCardDimentionsField({
  height,
  label = "Size",
  unit = "cm",
  width,
}: WigitsCardDimentionsFieldProps) {
  return (
    <WigitFieldContainer>
      <WigitFieldLabel>{label}</WigitFieldLabel>
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
          {unit}
        </span>
      </div>
    </WigitFieldContainer>
  );
}
