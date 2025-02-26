import WigitFieldContainer from "./WigitFieldContainer";
import WigitFieldLabel from "./WigitFieldLabel";

type WigitCardTextFieldProps = {
  label: string;
  text: string;
};

export default function WigitCardTextField({
  label,
  text,
}: WigitCardTextFieldProps) {
  return (
    <WigitFieldContainer>
      <WigitFieldLabel>{label}</WigitFieldLabel>
      <div>
        <span>{text}</span>
      </div>
    </WigitFieldContainer>
  );
}
