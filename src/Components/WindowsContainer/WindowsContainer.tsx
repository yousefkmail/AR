import { ReactNode, useState } from "react";
import { Window } from "../DraggableComponent/Window";
import Windowsbar from "../WindowsBar/Windowsbar";
import {
  faGear,
  faPuzzlePiece,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { PiecesContainer } from "../PiecesContainer/PiecesContainer";
import { SceneSettings } from "../SceneSettings/SceneSettings";
import PremadeTemplates from "../PremadeTemplates/PremadeTemplates";

export interface WindowData {
  name: string;
  icon: IconDefinition;
  window: () => ReactNode;
}

export default function WindowsContainer() {
  const [windowsData] = useState<WindowData[]>([
    { name: "Pieces", icon: faNewspaper, window: () => <PiecesContainer /> },
    { name: "Settings", icon: faGear, window: () => <SceneSettings /> },
    {
      name: "Templates",
      icon: faPuzzlePiece,
      window: () => <PremadeTemplates />,
    },
  ]);

  const [activeWidnow, setActiveWindow] = useState<WindowData>(windowsData[0]);

  const HandleVisuals = (index: number) => {
    setActiveWindow(windowsData[index]);
  };

  return (
    <Window
      defaultSize={{ height: 500, width: 400 }}
      name="Pieces"
      isShown={true}
    >
      <Windowsbar
        activeWindow={activeWidnow}
        windowsData={windowsData}
        onToggle={HandleVisuals}
      />
      {<activeWidnow.window />}
    </Window>
  );
}
