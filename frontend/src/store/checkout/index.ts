/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useCheckout = create((set) => ({
  products: [] as any[],
  addProduct: (product: any) =>
    set((state: any) => ({ products: [...state.bears, product] })),
  //   removeProduct: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));
