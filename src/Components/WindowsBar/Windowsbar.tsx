import { WindowData } from "../WindowsContainer/WindowsContainer";
import FontawesomeIconButton from "../Button/FontawesomeIconButton";
interface WindowsBarProps {
  windowsData?: (WindowData | null)[];
  activeWindow: WindowData;
  onToggle?: (index: number) => void;
  OnScreenshotPressed?: () => void;
}

export default function Windowsbar({
  windowsData,
  onToggle,
  activeWindow,
}: WindowsBarProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        backgroundColor: "var(--color-primary)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "max-content",
            backgroundColor: "var(--color-primary)",
            padding: "10px",
            display: "flex",
            borderRadius: "7px",
            justifyContent: "center",
          }}
        >
          {windowsData?.map(
            (item, index) =>
              item && (
                <FontawesomeIconButton
                  onClick={() => onToggle?.(index)}
                  key={index}
                  isActive={item.name === activeWindow.name}
                  icon={item.icon}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
