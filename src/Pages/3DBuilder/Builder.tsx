import BuilderUI from "./BuilderUI";
import BuilderCanvas from "./BuilderCanvas";

const Builder = () => {
  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <BuilderUI />
      <BuilderCanvas />
    </div>
  );
};

export default Builder;
