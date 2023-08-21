import { create } from 'zustand';

const useSortingStore = create((set) => ({
  sortProductsBy: '',
  sortShopsBy: '',
  sortExpertBy: '',

  setSortProductsBy: (sortBy: string) => set({ sortProductsBy: sortBy }),
  setSortShopsBy: (sortBy: string) => set({ sortShopsBy: sortBy }),
  setSortExpertBy: (sortBy: string) => set({ sortExpertBy: sortBy })
}));

export default useSortingStore;
