import FontawesomeIconButton from "@components/Button/FontawesomeIconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface MobileCartItemHeaderProps {
  previewImage?: string;
  name?: string;
  onRemove?: () => void;
}

export default function MobileCartItemHeader({
  name,
  onRemove,
  previewImage,
}: MobileCartItemHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <p>{name}</p>
        {previewImage && (
          <img
            style={{
              width: "100px",
              aspectRatio: "1/1",
              objectFit: "contain",
              marginRight: "10px",
            }}
            src={previewImage}
          />
        )}
      </div>

      <FontawesomeIconButton
        size="lg"
        onClick={() => onRemove?.()}
        icon={faXmark}
        isActive={false}
      />
    </div>
  );
}
