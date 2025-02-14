import { Piece } from "@core/index";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IPieceService } from "../Interfaces/IPieceService";
import { firestore } from "@lib/Firebase/App";

export const FirebasePieceService: IPieceService = {
  async getAllPieces(): Promise<Piece[]> {
    const snapshot = await getDocs(collection(firestore, "pieces"));
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Piece));
  },

  async getPieceById(id: string): Promise<Piece | null> {
    const docRef = doc(collection(firestore, "bases"));
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ ...docSnap.data(), id } as Piece) : null;
  },
  getPiecesByIds: async function (_ids: string[]): Promise<Piece[]> {
    return [];
  },
};
