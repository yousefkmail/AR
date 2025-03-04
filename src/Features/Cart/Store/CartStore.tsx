import { create } from "zustand";
import { ProductItem } from "@data";
import { CartItemType } from "../Models/CartItemType";
import { IncrementalArray } from "@utils/IncrementalArray";
import { TemplateModel } from "@core/index";
import { pieceService } from "@services/Services";
import { IncrementalStore } from "./IncrementalStore";

export interface CartStore {
  items: CartItemType<ProductItem>[];
  setItems: (items: CartItemType<ProductItem>[]) => void;
  addItem: (item: CartItemType<ProductItem>) => void;
  removeItem: (item: CartItemType<ProductItem>) => void;
  decreaseItem: (item: CartItemType<ProductItem>) => void;

  initializeCart: () => void;
  productItems: CartItemType<ProductItem>[];
}

const compareFn: (
  first: CartItemType<ProductItem>,
  second: CartItemType<ProductItem>
) => boolean = (
  first: CartItemType<ProductItem>,
  second: CartItemType<ProductItem>
) => {
  return first.item.id === second.item.id;
};

const StoreCart = (items: CartItemType<ProductItem>[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const useCartStore = create<CartStore>((set, get) => {
  const computerProductItems = () => {
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(
        (a, b) => a.item.id === b.item.id
      );

    get().items.forEach((cartItem) => {
      if ("pieces" in cartItem.item) {
        const templateModel = cartItem.item as TemplateModel;

        updatedProductItems.addItem({
          item: templateModel.base,
          quantity: cartItem.quantity,
          type: "base",
        });

        templateModel.pieces.forEach((PieceChild) => {
          updatedProductItems.addItem({
            item: PieceChild.piece,
            quantity: cartItem.quantity,
            type: "piece",
          });
        });
      } else {
        updatedProductItems.addItem({
          ...cartItem,
        });
      }
    });

    set({ productItems: updatedProductItems.getItems() });
  };

  const {
    add: addItems,
    items,
    remove: removeItem,
    set: setItems,
    decrease: decreaseItem,
  } = IncrementalStore<CartItemType<ProductItem>, CartStore>(
    set,
    compareFn,
    "items"
  );

  return {
    items: items as CartItemType<ProductItem>[],
    setItems: setItems,
    addItem: (item) => {
      addItems(item);
      StoreCart(get().items);
      computerProductItems();
    },

    removeItem: (item) => {
      removeItem(item);
      StoreCart(get().items);
      computerProductItems();
    },

    decreaseItem: (item) => {
      decreaseItem(item);
      StoreCart(get().items);
      computerProductItems();
    },

    initializeCart: async () => {
      const ids = localStorage.getItem("cart");
      if (!ids || ids.length < 1) {
        return [];
      }

      const data = await pieceService.getPiecesByIds(
        JSON.parse(ids).map(
          (item: { item: ProductItem; quantity: number }) => item.item.id
        )
      );
      const items = (JSON.parse(ids) as CartItemType<ProductItem>[]).map(
        ({ ...item }) =>
          ({
            quantity: item.quantity,
            type: item.type,
            item: {
              ...item.item,
              price:
                data?.find((itemm) => itemm.id === item.item.id)?.price ??
                item.item.price,
              previewImage:
                data?.find((itemm) => itemm.id === item.item.id)
                  ?.previewImage ?? item.item.previewImage,
            },
          } as CartItemType<ProductItem>)
      );

      set({ items });
      StoreCart(get().items);
      computerProductItems();
    },

    productItems: [],
    finalProductItems: [],
  };
});

export default useCartStore;
