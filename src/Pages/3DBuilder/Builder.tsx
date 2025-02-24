import BuilderUI from "./BuilderUI";
import BuilderCanvas from "./BuilderCanvas";
import ContextMenuContainer from "@features/ContextMenu/ContextMenuContainer";

export const Builder = () => {
  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <BuilderUI />
      <BuilderCanvas />
      <ContextMenuContainer />
    </div>
  );
};

export default Builder;
