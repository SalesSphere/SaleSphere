/* eslint-disable @typescript-eslint/no-explicit-any */
import { MEDIUM_PAGE_LIMIT } from "@/lib/constants";
import { IProductStore } from "@/lib/types/product.types";
import { create } from "zustand";

export const useAddProductStore = create<IProductStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: any) => set(() => ({ isOpen: isOpen })),
  params: {
    page: 1,
    text: "",
    perPage: MEDIUM_PAGE_LIMIT,
  },
  setParams: (params) =>
    set(() => ({
      params,
    })),
}));
