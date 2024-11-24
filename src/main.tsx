import { DraggedPieceContextProvider } from "./Context/DraggedPieceContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PiecesContextProvider } from "./Context/PiecesContext.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { StrictMode } from "react";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { PlanesContainerContextProvider } from "./Context/PlanesContainerContext.tsx";
import { SceneSettingsContextProvider } from "./Context/SceneSettingsContext.tsx";
import { ContextMenuProvider } from "./Features/ContextMenu/ContextMenuProvider.tsx";
import { EnvironmentContextProvider } from "./Context/EnvironmentContext.tsx";
import { NotificationProvider } from "./Features/NotificationService/NotificationContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <EnvironmentContextProvider>
        <ContextMenuProvider>
          <SceneSettingsContextProvider>
            <QueryClientProvider client={queryClient}>
              <PlanesContainerContextProvider>
                <DndProvider backend={HTML5Backend}>
                  <PiecesContextProvider>
                    <DraggedPieceContextProvider>
                      <SkeletonTheme
                        baseColor="#b3aaa6"
                        highlightColor="#eaeaea"
                        duration={2}
                      >
                        <App />
                      </SkeletonTheme>
                    </DraggedPieceContextProvider>
                  </PiecesContextProvider>
                </DndProvider>
              </PlanesContainerContextProvider>
            </QueryClientProvider>
          </SceneSettingsContextProvider>
        </ContextMenuProvider>
      </EnvironmentContextProvider>
    </NotificationProvider>
  </StrictMode>
);
