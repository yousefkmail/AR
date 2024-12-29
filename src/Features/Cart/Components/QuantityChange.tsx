import { HTMLAttributes } from "react";
import FontawesomeIconButton from "../../../Components/Button/FontawesomeIconButton";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface QuantityChangeProps extends HTMLAttributes<HTMLDivElement> {
  onIncrease?: () => void;
  onDecrease?: () => void;
  canIncrease?: boolean;
  canDecrease?: boolean;
}

export default function QuantityChange({
  children,
  onIncrease,
  onDecrease,
  canDecrease = true,
  canIncrease = true,
}: QuantityChangeProps) {
  return (
    <div>
      <FontawesomeIconButton
        className="btn-sec-color"
        disabled={!canDecrease}
        icon={faMinus}
        isActive={false}
        onClick={() => onDecrease?.()}
      ></FontawesomeIconButton>
      {children}
      <FontawesomeIconButton
        className="btn-sec-color"
        disabled={!canIncrease}
        icon={faPlus}
        isActive={false}
        onClick={() => onIncrease?.()}
      ></FontawesomeIconButton>
    </div>
  );
}
