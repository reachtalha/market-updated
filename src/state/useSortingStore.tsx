import { create } from 'zustand';

const useSortingStore = create((set) => ({
  sortProductsBy: '',
  sortShopsBy: '',
  sortExpertBy: '',
  sortSellerProductsBy: '',

  setSortProductsBy: (sortBy: string) => set({ sortProductsBy: sortBy }),
  setSortShopsBy: (sortBy: string) => set({ sortShopsBy: sortBy }),
  setSortExpertBy: (sortBy: string) => set({ sortExpertBy: sortBy }),
  setSortSellerProductsBy: (sortBy: string) => set({ sortSellerProductsBy: sortBy })
}));

export default useSortingStore;
