import { IncrementalArrayItem } from "@utils/IncrementalArray";

export function setItems<T>(_items: T[], newItems: T[]): T[] {
  return newItems;
}

export function addItem<T extends IncrementalArrayItem>(
  items: T[],
  item: T,
  compareFn: (a: T, b: T) => boolean
): T[] {
  const existingItem = items.find((entry) => compareFn(entry, item));
  let itemss = [];
  if (existingItem) {
    itemss = items.map((entry) =>
      compareFn(entry, item)
        ? { ...entry, quantity: entry.quantity + item.quantity }
        : entry
    );
  } else {
    itemss = [...items, { ...item }];
  }

  return itemss;
}

export function removeItem<T>(
  items: T[],
  item: T,
  compareFn: (a: T, b: T) => boolean
): T[] {
  return items.filter((i) => !compareFn(i, item));
}

export function decreaseItem<T extends IncrementalArrayItem>(
  items: T[],
  item: T,
  compareFn: (a: T, b: T) => boolean
): T[] {
  return items.map((i) =>
    compareFn(i, item) ? { ...i, quantity: Math.max(i.quantity - 1, 0) } : i
  );
}
