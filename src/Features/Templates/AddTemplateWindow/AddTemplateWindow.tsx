import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UnresolvedTemplateModel } from "@core";
import { collection, doc, addDoc, getFirestore } from "firebase/firestore";
import { AddTemplatePopup } from "@features/ContextMenu";
import { useTemplateStore } from "./AddTemplateStore";
import { v4 as uuidv4 } from "uuid";
export default function AddTemplateWindow() {
  const item = useTemplateStore((state) => state.item);
  const isOpen = useTemplateStore((state) => state.isOpen);
  const closePopup = useTemplateStore((state) => state.closePopup);
  const AddTemplateToDatabase = async (
    name: string,
    description: string,
    file?: File
  ) => {
    if (!file || !item) return;

    const storage = getStorage(); // Ensure Firebase is initialized in your project
    const storageRef = ref(storage, `templates/${uuidv4()}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(uploadTask.ref);

    const collectionRef = collection(getFirestore(), "bases");

    const itemm: UnresolvedTemplateModel = {
      base: doc(collectionRef, item.base.id),
      name,
      state: "NotLoaded",
      children: item.children.map((item) => ({
        piece: doc(collection(getFirestore(), "pieces"), item.piece.id),
        id: item.id,
        layer: item.layer,
        position: item.position,
      })),
      description,
      previewImage: url,
      price:
        item.children.reduce((prev, next) => prev + next.piece.price, 0) +
        item.base.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
    };

    const templatesCollection = collection(getFirestore(), "templates");

    await addDoc(templatesCollection, itemm);
  };

  return (
    <div style={{ zIndex: "9999", position: "relative" }}>
      <AddTemplatePopup
        isShown={isOpen}
        onClose={() => closePopup()}
        onAddTemplatePressed={AddTemplateToDatabase}
      />
    </div>
  );
}
