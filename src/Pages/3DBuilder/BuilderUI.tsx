import Sidenav from "../../Components/Sidenav/Sidenav";
import WindowsContainer from "../../Components/WindowsContainer/WindowsContainer";
import ContextContainer from "../../Features/ContextMenu/ContextContainer";

export default function BuilderUI() {
  return (
    <>
      <WindowsContainer />
      <Sidenav />
      <ContextContainer />
    </>
  );
}
