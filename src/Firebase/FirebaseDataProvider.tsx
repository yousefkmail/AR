import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { DataProvider, GetListParams, GetOneParams } from "react-admin";
import { Basis } from "../DataService/Models/BasisModel";
import { firestore } from "./firebaseApp";

export class FirebaseDataProvider implements DataProvider {
  [key: string]: any;
  supportAbortSignal?: boolean | undefined = false;
  getList = async (resource: string, params: GetListParams) => {
    const firestore = getFirestore();
    const { perPage, page } = params.pagination || {};
    const { field, order } = params.sort || {};
    const { lastDoc } = params.meta || {};
    const collectionRef = collection(firestore, resource);
    const totalDocs = (await getCountFromServer(collectionRef)).data().count;

    let queryConstraints = [];

    if (field && order) {
      queryConstraints.push(
        orderBy(
          field === "id" ? "__name__" : field,
          order === "ASC" ? "asc" : "desc"
        )
      );
    }

    if (lastDoc) {
      queryConstraints.push(lastDoc);
    }

    if (perPage) {
      queryConstraints.push(limit(perPage));
    }

    let que = query(collectionRef, ...queryConstraints);

    if (page && page > 1) {
      const previousPageSnapshot = await getDocs(
        query(
          collectionRef,
          orderBy(field ?? "__name__", order === "ASC" ? "asc" : "desc"),
          limit((page - 1) * (perPage ?? 5))
        )
      );
      const lastVisible =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
      que = query(
        collectionRef,

        orderBy(
          field ? (field === "id" ? "__name__" : field) : "__name__",
          order === "ASC" ? "asc" : "desc"
        ),
        startAfter(lastVisible),
        limit(perPage ?? 5)
      );
    }

    const querySnapshot = await getDocs(que);
    const data: any[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Basis),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      id: doc.id,
    }));

    return {
      data,
      total: totalDocs,
      meta: "sad",
    };
  };

  getOne = async (Resource: string, params: GetOneParams) => {
    const { id } = params;
    const firestore = getFirestore();
    const item = await getDoc(doc(collection(firestore, Resource), id));
    const data: any = { ...(item.data() as Basis), id: item.id };
    return { data };
  };

  create = async (Resource: string, params: any) => {
    const item = await addDoc(collection(firestore, Resource), {
      ...params.data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const doc = await getDoc(item);
    const data: any = { ...doc.data(), id: doc.id };
    return { data, meta: {} };
  };

  delete = async (Resource: string, params: any) => {
    const deleteDocument = await deleteDoc(
      doc(collection(firestore, Resource), params.id)
    );

    return { data: {} as any, meta: {} };
  };
  deleteMany = async (Resource: string, params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
  getMany = async (Resource: string, params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
  getManyReference = async (Resource: string, params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
  update = async (Resource: string, params: any) => {
    try {
      const docRef = doc(collection(firestore, Resource), params.id); // Reference the document
      await updateDoc(docRef, params.data); // Update the document
      return { data: { id: docRef.id } as any, meta: {} };
    } catch (error) {
      console.error("Error updating document:", error);
      throw error; // Rethrow for handling in the caller function
    }
  };
  updateMany = async (Resource: string, params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
}
