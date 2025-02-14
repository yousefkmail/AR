import { DraggedPieceContextProvider } from "./Features/DragAndDrop/Context/UIDraggedPieceContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { PiecesContextProvider } from "./Context/PiecesContext.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { ContextMenuProvider } from "./Features/ContextMenu/Contexts/Providers/ContextMenuProvider.tsx";
import { EnvironmentContextProvider } from "./Features/Screenshot/Context/EnvironmentContext.tsx";
import { NotificationProvider } from "./Features/NotificationService/NotificationContext.tsx";
import { CartContextProvider } from "@features/Cart";
import { CartPopupProvider } from "@features/Cart/Contexts/CartPopupContext.tsx";
import { AddTemplatePopupProvider } from "@features/Templates/AddTemplateWindow/AddTemplateWindowContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import {
  PlanesContainerContextProvider,
  SceneSettingsContextProvider,
} from "@core";
import { queryClient } from "./Lib/ReactQuery/Client.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <NotificationProvider>
        <CartContextProvider>
          <CartPopupProvider>
            <AddTemplatePopupProvider>
              <EnvironmentContextProvider>
                <SceneSettingsContextProvider>
                  <QueryClientProvider client={queryClient}>
                    <PlanesContainerContextProvider>
                      <PiecesContextProvider>
                        <DraggedPieceContextProvider>
                          <ContextMenuProvider>
                            <SkeletonTheme
                              baseColor="#b3aaa6"
                              highlightColor="#eaeaea"
                              duration={2}
                            >
                              <App />
                            </SkeletonTheme>
                          </ContextMenuProvider>
                        </DraggedPieceContextProvider>
                      </PiecesContextProvider>
                    </PlanesContainerContextProvider>
                  </QueryClientProvider>
                </SceneSettingsContextProvider>
              </EnvironmentContextProvider>
            </AddTemplatePopupProvider>
          </CartPopupProvider>
        </CartContextProvider>
      </NotificationProvider>
    </HelmetProvider>
  </StrictMode>
);
