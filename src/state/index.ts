import { create } from "zustand";

const useGlobalStore = create((set) => ({
  showSidebar: false,
  isMobile: window.innerWidth < 468,
  setShowSidebar: (value: boolean) => set({ showSidebar: value }),
}));

export default useGlobalStore;
