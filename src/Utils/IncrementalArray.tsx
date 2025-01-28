export interface IncrementalArrayItem {
  quantity: number; // Adjusted to `number` for easier arithmetic operations
}

type ComparisonFunction<T> = (a: T, b: T) => boolean;

export class IncrementalArray<T extends IncrementalArrayItem> {
  private data: T[] = [];
  private compareFn: ComparisonFunction<T>;

  constructor(compareFn: ComparisonFunction<T>) {
    this.compareFn = compareFn;
  }

  // Method to add or update items based on comparison function
  addItem(newItem: T): void {
    const existingIndex = this.data.findIndex((item) =>
      this.compareFn(item, newItem)
    );

    if (existingIndex !== -1) {
      // Item found, update quantity (assumes 'quantity' is a number)
      this.data = this.data.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    } else {
      // Item not found, add to the array
      this.data.push(newItem);
    }
  }

  // Method to remove or reduce quantity of an item
  removeQuantity(item: T): void {
    const existingIndex = this.data.findIndex((existingItem) =>
      this.compareFn(existingItem, item)
    );

    if (existingIndex !== -1) {
      this.data = this.data.map((existingItem, index) => {
        if (index === existingIndex) {
          const newQuantity = Math.max(
            0,
            existingItem.quantity - item.quantity
          );
          return { ...existingItem, quantity: newQuantity };
        }
        return existingItem;
      });
    }
  }

  // Method to get all items (for displaying or other purposes)
  getItems(): T[] {
    return this.data;
  }
}
