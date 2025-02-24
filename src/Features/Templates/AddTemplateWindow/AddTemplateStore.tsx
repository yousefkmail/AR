import { TemplateModel } from "@core/index";
import { create } from "zustand";

interface TemplateStoreProps {
  isOpen: boolean;
  item: TemplateModel | null;
  openPopup: (item: TemplateModel) => void;
  closePopup: () => void;
}

export const useTemplateStore = create<TemplateStoreProps>((set) => {
  return {
    item: null,
    isOpen: false,
    closePopup: () => {
      set(() => ({ item: null, isOpen: false }));
    },
    openPopup: (item) => {
      set(() => ({
        isOpen: true,
        item,
      }));
    },
  };
});
