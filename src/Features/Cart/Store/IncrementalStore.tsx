import {
  addItem,
  decreaseItem,
  removeItem,
  setItems,
} from "../Utils/CartUtils";
import { IncrementalArrayItem } from "@utils/IncrementalArray";

export function IncrementalStore<T extends IncrementalArrayItem, B>(
  set: {
    (
      partial: B | Partial<B> | ((state: B) => B | Partial<B>),
      replace?: false
    ): void;
    (state: B | ((state: B) => B), replace: true): void;
  },
  compareFn: (a: T, b: T) => boolean,
  resouce: keyof B
) {
  return {
    [resouce]: [] as T[],
    add: (item: T) =>
      set(
        (state: B) =>
          ({
            [resouce]: addItem(state[resouce] as any, item, compareFn),
          } as Partial<B>)
      ),

    remove: (item: T) =>
      set(
        (state: B) =>
          ({
            [resouce]: removeItem(state[resouce] as any, item, compareFn),
          } as Partial<B>)
      ),
    set: (item: T[]) =>
      set(
        (state: B) =>
          ({
            [resouce]: setItems(state[resouce] as any, item),
          } as Partial<B>)
      ),

    decrease: (item: T) =>
      set(
        (state: B) =>
          ({
            [resouce]: decreaseItem(state[resouce] as any, item, compareFn),
          } as Partial<B>)
      ),
  };
}
