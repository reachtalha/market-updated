import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],
  setCartItems: (items: any) => set((state: any) => ({ cartItems: [...state.cartItems, items] })),
}));

export default useCartStore;
