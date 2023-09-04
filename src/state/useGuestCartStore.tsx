import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { calculateCartSummary } from '@/state/useCartStore';

const changeQuantity = (items: any, productId: string, skuId: string, by = 0) => {
   return items.map((item: any) => {
    if(item.id === productId && item.selectedVariant.id === skuId){
      if(item.quantity + by < 1) return null;
      return {...item, quantity: item.quantity + by }
    }
    return item;
  }).filter(Boolean);
}

const useGuestCartStore = create(persist((set, get) => ({
  guestCart: {
    userId: '',
    id: '',
    items: [],
    summary: null
  },
  showGuestCartPopover: false,
  setShowGuestCartPopover: (value: boolean) => set({ showGuestCartPopover: value }),
  addToGuestCart: (product: any) => {
    set((state: any) => {
      const productWithId = state.guestCart.items.find((item: any) => item.id === product.id);
      const productWithVariant = state.guestCart.items.find((item: any) => item.selectedVariant.id === product.selectedVariant.id);
      if(productWithId && productWithVariant){
        return {
          showCartGuestPopover: true,
          guestCart:
            {
              summary: calculateCartSummary(state.guestCart.items),
              items: changeQuantity(state.guestCart.items, product.id, product.selectedVariant.id, 1),
            } || {}
        }
      }else {
        return {
          showGuestCartPopover: true,
          guestCart:
            {
              summary: calculateCartSummary([...state.guestCart.items, {...product, quantity: 1 }]),
              items: [...state.guestCart.items, {...product, quantity: 1 }],
            } || {}
        }
      }
    })
  },
  deleteFromGuestCart: (productId: string, skuId: string) => {
    // @ts-ignore
    const guestCart = get().guestCart;
    const items = guestCart.items.filter((item: any) => item.id !== productId && item.selectedVariant.id !== skuId);
    set({ guestCart: {
        summary: calculateCartSummary(items),
        items
      }});
  },
  getGuestCart: (userId: string, isCartLoading: boolean = true) => {
  },
  incrementGuestCartItem: (productId: string, skuId: string) => {
    // @ts-ignore
    const guestCart = get().guestCart;
    const items = changeQuantity(guestCart.items, productId, skuId, 1);
    set({ showGuestCartPopover: true, guestCart: {
      summary: calculateCartSummary(items),
      items
    }});
  },
  decrementGuestCartItem: (productId: string, skuId: string) => {
    // @ts-ignore
    const guestCart = get().guestCart;
    const items = changeQuantity(guestCart.items, productId, skuId, -1);
    set({ showGuestCartPopover: true, guestCart: {
      summary: calculateCartSummary(items),
      items
    }});
  },
  clearGuestCart: () => {
    set({ guestCart: { items: [], summary: null }})
  }
}), {
  name: "guest-cart",
  storage: createJSONStorage(() => localStorage)
}));

export default useGuestCartStore;
