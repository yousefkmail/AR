import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PiecesContextProvider } from "./Context/PiecesContext.tsx";
import { DraggedPieceContextProvider } from "./Context/DraggedPieceContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PiecesContextProvider>
        <DraggedPieceContextProvider>
          <App />
        </DraggedPieceContextProvider>
      </PiecesContextProvider>
    </BrowserRouter>
  </StrictMode>
);
