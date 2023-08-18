import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  showSidebar: false,
  SKUList: [],
  setShowSidebar: (value: boolean) => set({ showSidebar: value }),
  setSKUList: (value: any) =>
    set((state: any) => ({
      SKUList: [...state.SKUList, value] // Fix the syntax here, return the new state
    })),
  emptySKUList: () => set({ SKUList: [] }),
  setInitialSKUList: (value: any) => set({ SKUList: value })
}));

export default useGlobalStore;
