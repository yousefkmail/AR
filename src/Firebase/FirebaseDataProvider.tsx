import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { DataProvider, GetListParams, GetOneParams } from "react-admin";
import { firestore } from "./firebaseApp";
import { ResolveDocumentReferences } from "./ResolvedDocumentReference";

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
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),

      updatedAt: doc.data().updatedAt?.toDate(),
      id: doc.id,
    }));

    return {
      data,
      total: totalDocs,
    };
  };

  getOne = async (Resource: string, params: GetOneParams) => {
    const { id } = params;
    const firestore = getFirestore();
    const itemSnapshot = await getDoc(doc(collection(firestore, Resource), id));

    if (!itemSnapshot.exists()) {
      throw new Error(`Document with ID ${id} does not exist in ${Resource}`);
    }

    // Recursively resolve document references
    const resolveDocumentReferences = async (data: any): Promise<any> => {
      if (Array.isArray(data)) {
        // If the value is an array, map over it instead of treating it as an object
        return Promise.all(data.map(resolveDocumentReferences));
      }

      if (typeof data !== "object" || data === null) {
        return data; // Return non-objects as-is
      }

      const result: any = {};
      for (const key in data) {
        if (data[key] instanceof DocumentReference) {
          const refDoc = await getDoc(data[key]);
          if (refDoc.exists()) {
            const resolvedDoc = await resolveDocumentReferences({
              ...refDoc.data(),
              id: refDoc.id,
            });
            result[key] = new ResolveDocumentReferences<any>(
              refDoc.ref.path.split("/")[0],
              refDoc.id,
              resolvedDoc
            );
          } else {
            result[key] = null;
          }
        } else {
          result[key] = await resolveDocumentReferences(data[key]);
        }
      }
      return result;
    };

    const resolvedData = await resolveDocumentReferences({
      ...itemSnapshot.data(),

      id: itemSnapshot.id,
    });
    resolvedData.createdAt = (
      itemSnapshot.data().createdAt as Timestamp
    )?.toDate();
    resolvedData.updatedAt = (
      itemSnapshot.data().updatedAt as Timestamp
    )?.toDate();
    console.log(resolvedData);
    return { data: resolvedData };
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
    await deleteDoc(doc(collection(firestore, Resource), params.id));

    return { data: {} as any, meta: {} };
  };
  deleteMany = async (_Resource: string, _params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
  getMany = async (_Resource: string, _params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
  getManyReference = async (_Resource: string, _params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };

  update = async (Resource: string, params: any) => {
    try {
      const firestore = getFirestore();
      const docRef = doc(collection(firestore, Resource), params.id); // Reference the document
      console.log(params);
      // Function to transform data before updating Firebase
      const transformDataForFirebase = (data: any): any => {
        if (Array.isArray(data)) {
          return data.map(transformDataForFirebase);
        } else if (typeof data === "object" && data !== null) {
          const result: any = {};
          for (const key in data) {
            if (data[key] instanceof Date) {
              // Convert JavaScript Date to Firebase Timestamp
              result[key] = Timestamp.fromDate(data[key]);
            } else if (data[key] instanceof ResolveDocumentReferences) {
              // Convert custom document reference object back to Firebase DocumentReference
              result[key] = doc(
                collection(firestore, data[key].collection),
                data[key].id
              );
            } else {
              result[key] = transformDataForFirebase(data[key]);
            }
          }
          return result;
        }
        return data;
      };

      const cleanedData = transformDataForFirebase(params.data);

      // Ensure updatedAt is always set to the current timestamp
      cleanedData.updatedAt = serverTimestamp();

      await updateDoc(docRef, cleanedData); // Update the document
      return { data: { id: docRef.id } as any, meta: {} };
    } catch (error) {
      console.error("Error updating document:", error);
      throw error; // Rethrow for handling in the caller function
    }
  };

  updateMany = async (_Resource: string, _params: any) => {
    const dataa: any = { id: "asd" };
    return { data: dataa, meta: {} };
  };
}
