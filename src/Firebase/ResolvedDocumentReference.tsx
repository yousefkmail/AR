export class ResolveDocumentReferences<T> {
  collection: string;
  id: string;
  data: T;
  constructor(collection: string, id: string, data: T) {
    this.collection = collection;
    this.id = id;
    this.data = data;
  }
}
