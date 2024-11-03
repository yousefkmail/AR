import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./Routes/Router";

function App() {
  return <RouterProvider router={AppRouter}></RouterProvider>;
}
export default App;
