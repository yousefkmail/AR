import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAddTemplatePopup } from "./AddTemplateWindowContext";
import AddTemplatePopup from "@features/ContextMenu/AddTemplatePopup";
import { UnresolvedTemplateModel } from "@data/Models";
import { firestore } from "../../../Firebase/firebaseApp";
import { collection, doc, addDoc } from "firebase/firestore";

export default function AddTemplateWindow() {
  const { isOpen, item, closePopup } = useAddTemplatePopup();

  const AddTemplateToDatabase = async (
    name: string,
    description: string,
    file?: File
  ) => {
    if (!file || !item) return;

    const storage = getStorage(); // Ensure Firebase is initialized in your project
    const storageRef = ref(storage, `templates/${file.name}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(uploadTask.ref);

    const collectionRef = collection(firestore, "bases");

    const itemm: UnresolvedTemplateModel = {
      base: doc(collectionRef, item.base.id),
      name,
      state: "NotLoaded",
      children: item.children.map((item) => ({
        piece: doc(collection(firestore, "pieces"), item.piece.id),
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

    const templatesCollection = collection(firestore, "templates");

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
