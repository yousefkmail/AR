import { HTMLAttributes } from "react";

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
      <button disabled={!canDecrease} onClick={() => onDecrease?.()}>
        -
      </button>
      {children}
      <button disabled={!canIncrease} onClick={() => onIncrease?.()}>
        +
      </button>
    </div>
  );
}
