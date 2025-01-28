import { useState } from "react";

export interface IncrementalArrayItem {
  quantity: number; // Adjusted to `number` for easier arithmetic operations
}

type ComparisonFunction<T> = (a: T, b: T) => boolean;

export enum IncrementalArrayThreshouldBehaviour {
  AllowNegative, // Decrease quantity, allow negatives
  stuckAt0, // Do not let quantity drop below 0
  delete, // Remove the item when quantity <= 0
}

export enum DecrementItemAddition {
  DoNotAdd,
  Add,
}

export function useIncrementalArray<T extends IncrementalArrayItem>(
  compareFn: ComparisonFunction<T>,
  incrementalArrayThreshouldBehaviour: IncrementalArrayThreshouldBehaviour = IncrementalArrayThreshouldBehaviour.AllowNegative
) {
  const [items, setItems] = useState<T[]>([]);

  const addItem = (newItem: T) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((entry) => compareFn(entry, newItem));
      if (existingItem) {
        return prevItems.map((entry) =>
          compareFn(entry, newItem)
            ? { ...entry, quantity: entry.quantity + newItem.quantity }
            : entry
        );
      } else {
        return [...prevItems, { ...newItem }];
      }
    });
  };

  const decreaseItem = (
    targetItem: T,
    AddOnNotFoundDecrement: DecrementItemAddition = DecrementItemAddition.DoNotAdd
  ) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((entry) =>
        compareFn(entry, targetItem)
      );
      if (!existingItem) {
        if (AddOnNotFoundDecrement === DecrementItemAddition.DoNotAdd) {
          console.warn("Attempted to decrease a non-existing item");
          return prevItems;
        } else {
          return [
            ...prevItems,
            { ...targetItem, quantity: -targetItem.quantity },
          ];
        }
      } // No action if the item is not found

      switch (incrementalArrayThreshouldBehaviour) {
        case IncrementalArrayThreshouldBehaviour.stuckAt0:
          return prevItems.map((entry) =>
            compareFn(entry, targetItem)
              ? {
                  ...entry,
                  quantity: Math.max(0, entry.quantity - targetItem.quantity),
                }
              : entry
          );

        case IncrementalArrayThreshouldBehaviour.delete:
          return prevItems
            .map((entry) =>
              compareFn(entry, targetItem)
                ? { ...entry, quantity: entry.quantity - targetItem.quantity }
                : entry
            )
            .filter((entry) => entry.quantity > 0);

        case IncrementalArrayThreshouldBehaviour.AllowNegative:
        default:
          return prevItems.map((entry) =>
            compareFn(entry, targetItem)
              ? { ...entry, quantity: entry.quantity - targetItem.quantity }
              : entry
          );
      }
    });
  };

  const clearItems = () => {
    setItems([]);
  };

  const setItemsState = (items: T[]) => {
    setItems(items);
  };

  const removeItem = (itemToRemove: T) => {
    setItems((prev) => prev.filter((item) => !compareFn(item, itemToRemove)));
  };

  return {
    items,
    addItem,
    decreaseItem,
    clearItems,
    setItems: setItemsState,
    removeItem,
  };
}
