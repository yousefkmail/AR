import { ReactNode, useState } from "react";
import Windowsbar from "../WindowsBar/Windowsbar";
import {
  faGear,
  faPuzzlePiece,
  faXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { PiecesContainer } from "../PiecesContainer/PiecesContainer";
import { SceneSettings } from "../SceneSettings/SceneSettings";
import PremadeTemplates from "../PremadeTemplates/PremadeTemplates";
import FontawesomeIconButton from "../Button/FontawesomeIconButton";

export interface WindowData {
  name: string;
  icon: IconDefinition;
  window: () => ReactNode;
}

export default function WindowsContainer() {
  const [windowsData] = useState<WindowData[]>([
    { name: "Pieces", icon: faNewspaper, window: () => <PiecesContainer /> },
    {
      name: "Templates",
      icon: faPuzzlePiece,
      window: () => <PremadeTemplates />,
    },
    { name: "Settings", icon: faGear, window: () => <SceneSettings /> },
  ]);

  const [activeWidnow, setActiveWindow] = useState<WindowData>(windowsData[0]);

  const HandleVisuals = (index: number) => {
    setActiveWindow(windowsData[index]);
  };

  const [minimized, setMinimized] = useState<boolean>(false);

  return (
    <div
      className={
        "builder_windows-container " +
        (minimized ? "builder_windows-container-minimized" : "")
      }
    >
      <div
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "var(--color-primary)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <FontawesomeIconButton
          size="xl"
          onClick={() => setMinimized(!minimized)}
          icon={faXmark}
          isActive={false}
        />
        <Windowsbar
          activeWindow={activeWidnow}
          windowsData={windowsData}
          onToggle={HandleVisuals}
        />
        <div style={{ width: "35px" }}></div>
      </div>

      <div style={{ margin: "0 48px" }}>{<activeWidnow.window />}</div>
    </div>
  );
}
