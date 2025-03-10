import AddCartItemWindow from "@features/Cart/Components/AddCartItemWindow";
import Sidenav from "../../Components/Organisms/Sidenav/Sidenav";
import WindowsContainer from "../../Components/Organisms/WindowsContainer/WindowsContainer";
import AddTemplateWindow from "@features/Templates/AddTemplateWindow/AddTemplateWindow";
export default function BuilderUI() {
  return (
    <>
      <WindowsContainer />
      <Sidenav />
      <AddCartItemWindow />
      <AddTemplateWindow />
    </>
  );
}
