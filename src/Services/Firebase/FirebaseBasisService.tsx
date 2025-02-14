import { Basis } from "@core/index";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IBasisService } from "../Interfaces/IBasisService";
import { firestore } from "@lib/Firebase/App";

export const FirebaseBasisService: IBasisService = {
  async getAllBasis(): Promise<Basis[]> {
    const snapshot = await getDocs(collection(firestore, "bases"));
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Basis));
  },

  async getBasisById(id: string): Promise<Basis | null> {
    const docRef = doc(collection(firestore, "bases"));
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ ...docSnap.data(), id } as Basis) : null;
  },
};
