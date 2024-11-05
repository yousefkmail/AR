import { DraggedPieceContextProvider } from "./Context/DraggedPieceContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PiecesContextProvider } from "./Context/PiecesContext.tsx";
import { DragContextProvider } from "./Context/DragContext.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { StrictMode } from "react";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { PlanesContainerContextProvider } from "./Context/PlanesContainerContext.tsx";
import { HoveredObjectContextProvider } from "./Context/HoveredObjectContext.tsx";
import {
  SceneSettingsContext,
  SceneSettingsContextProvider,
} from "./Context/SceneSettingsContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SceneSettingsContextProvider>
      <PlanesContainerContextProvider>
        <HoveredObjectContextProvider>
          <DndProvider backend={HTML5Backend}>
            <QueryClientProvider client={queryClient}>
              <PiecesContextProvider>
                <DraggedPieceContextProvider>
                  <DragContextProvider>
                    <SkeletonTheme
                      baseColor="#b3aaa6"
                      highlightColor="#eaeaea"
                      duration={2}
                    >
                      <App />
                    </SkeletonTheme>
                  </DragContextProvider>
                </DraggedPieceContextProvider>
              </PiecesContextProvider>
            </QueryClientProvider>
          </DndProvider>
        </HoveredObjectContextProvider>
      </PlanesContainerContextProvider>
    </SceneSettingsContextProvider>
  </StrictMode>
);
