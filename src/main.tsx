import { DraggedPieceContextProvider } from "./Context/DraggedPieceContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PiecesContextProvider } from "./Context/PiecesContext.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { PlanesContainerContextProvider } from "./Context/PlanesContainerContext.tsx";
import { SceneSettingsContextProvider } from "./Context/SceneSettingsContext.tsx";
import { ContextMenuProvider } from "./Features/ContextMenu/ContextMenuProvider.tsx";
import { EnvironmentContextProvider } from "./Context/EnvironmentContext.tsx";
import { NotificationProvider } from "./Features/NotificationService/NotificationContext.tsx";
import { ObjectPreviewContextProvider } from "./Features/UIToCanvasDrag/ObjectPreview.tsx";
import { CartContextProvider } from "./Features/Cart/CartContextProvider.tsx";

export const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <CartContextProvider>
        <ObjectPreviewContextProvider>
          <EnvironmentContextProvider>
            <ContextMenuProvider>
              <SceneSettingsContextProvider>
                <QueryClientProvider client={queryClient}>
                  <PlanesContainerContextProvider>
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
                  </PlanesContainerContextProvider>
                </QueryClientProvider>
              </SceneSettingsContextProvider>
            </ContextMenuProvider>
          </EnvironmentContextProvider>
        </ObjectPreviewContextProvider>
      </CartContextProvider>
    </NotificationProvider>
  </StrictMode>
);
