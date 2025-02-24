import { DraggedPieceContextProvider } from "./Features/DragAndDrop/Context/UIDraggedPieceContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { PiecesContextProvider } from "./Context/PiecesContext.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { EnvironmentContextProvider } from "./Features/Screenshot/Context/EnvironmentContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import {
  PlanesContainerContextProvider,
  SceneSettingsContextProvider,
} from "@core";
import { queryClient } from "./Lib/ReactQuery/Client.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <EnvironmentContextProvider>
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
      </EnvironmentContextProvider>
    </HelmetProvider>
  </StrictMode>
);
