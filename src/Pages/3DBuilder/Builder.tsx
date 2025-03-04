import BuilderUI from "./BuilderUI";
import BuilderCanvas from "./BuilderCanvas";
import ContextMenuContainer from "@features/ContextMenu/ContextMenuContainer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "@lib/Firebase/App";
import { TemplateObject, useFullPieces } from "@core/index";
import { v4 as uuidv4 } from "uuid";
export const Builder = () => {
  const { id, index } = useParams();
  const { DispatchCreatedTemplates } = useFullPieces();

  const FetchOrder = async () => {
    const orderRef = doc(collection(firestore, "orders"), id);
    const order = await getDoc(orderRef);
    if (!order.exists || !index) return;
    const collectionn = (order.data() as any).collections[index];
    let item: TemplateObject = {
      id: uuidv4(),
      position: [1, 1, 1],
      rotation: [90, 0, 0],
      scale: [1, 1, 1],
      templateModel: collectionn.item,
    };
    DispatchCreatedTemplates({
      type: "set",
      payload: [item],
    });
  };

  useEffect(() => {
    FetchOrder();
  }, []);

  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <BuilderUI />
      <BuilderCanvas />
      <ContextMenuContainer />
    </div>
  );
};

export default Builder;
