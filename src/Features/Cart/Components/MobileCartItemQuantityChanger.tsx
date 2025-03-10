import QuantityChange from "../../../Components/atoms/QuantityChange";

interface MobileCartItemQuantityChangerProps {
  label?: string;
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  canDecrease: boolean;
}

export default function MobileCartItemQuantityChanger({
  label = "Quantity",
  onDecrease,
  onIncrease,
  canDecrease,
  quantity,
}: MobileCartItemQuantityChangerProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>{label}</p>
      <QuantityChange
        onIncrease={() => onIncrease?.()}
        onDecrease={() => onDecrease?.()}
        canDecrease={canDecrease}
      >
        <span
          style={{
            fontSize: "1.125rem",
            margin: "0 5px",
            display: "inline-block",
            minWidth: "20px",
            textAlign: "center",
          }}
        >
          {quantity}
        </span>
      </QuantityChange>
    </div>
  );
}
