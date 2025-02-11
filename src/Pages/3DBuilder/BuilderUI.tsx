import AddCartItemWindow from "@features/Cart/AddItemWindow/AddCartItemWindow";
import Sidenav from "../../Components/Sidenav/Sidenav";
import WindowsContainer from "../../Components/WindowsContainer/WindowsContainer";
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
