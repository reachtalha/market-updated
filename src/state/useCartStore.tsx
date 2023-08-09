import { create } from 'zustand';
import { db } from '@/lib/firebase/client';
import {
  addDoc, arrayRemove,
  arrayUnion,
  collection, deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';

const fetchDeleteFromCart = async (productId: string, cartDocId: string, skuId: string) => {
  const cartRef = doc(db, "cart", cartDocId);
  await updateDoc(cartRef, {
    items: arrayRemove({
      productId,
      skuId,
      quantity: 1
    })
  });
}

const fetchGetCart = async (userId: string) => {
  const cartRef = collection(db, "cart");
  const cart = await getDocs(query(cartRef, where("userId", "==", userId)));
  const hasCart = !!cart.docs.length;

  if (!hasCart) {
    await addDoc(cartRef, {
      userId: userId,
      items: [],
      total: 0
    });
  } else {
    const cartData = cart.docs[0].data();
    const cartItems = await Promise.all(
      cartData?.items?.map(async (item: any) => {
        const docRef = await getDoc(doc(db, 'products', item.productId));
        const productData = docRef.data();
        const selectedVariant = productData?.SKU.find((sku: any) => sku.id === item.skuId);
        return { ...item, ...productData, docId: docRef.id, selectedVariant };
      })
    );
    return { userId: cartData.userId, id: cart.docs[0].id, cart: { ...cartData, items: cartItems } };
  }
}

const fetchAddToCart = async (productId: string, cartDocId: string, skuId: string) => {
  const cartRef = doc(db, "cart", cartDocId);
  await updateDoc(cartRef, {
    items: arrayUnion({
      productId,
      skuId,
      quantity: 1
    })
  });
}

const fetchClearCart = async (cartDocId: string) => {
  const cartRef = doc(db, "cart", cartDocId);
  await deleteDoc(cartRef)
}

const calculateCartSummary = (items: any = []) => {
  const total = items?.reduce((acc: any, curr: any) => acc + curr.selectedVariant.price, 0);
  const shipping = 4;
  return {
    shipping,
    total: total + shipping
  }
}

const useCartStore = create((set, get) => ({
  cart: {
    userId: '',
    id: '',
    items: [],
    summary: null,
  },
  isCartLoading: false,
  isAddToCartLoading: false,
  setIsAddToCartLoading: (val: boolean) => {
    set({ isAddToCartLoading: val });
  },
  clearCart: async () => {
    set(async (state: any) => {
      const userId = state?.cart?.userId;
      await fetchClearCart(state.cart.id);
      await state.getCart(userId);
    })
  },
  addToCart: async (productId: string, skuId: string) => {
    set(async (state: any) => {
      state.setIsAddToCartLoading(true);
      await fetchAddToCart(productId, state.cart.id, skuId);
      state.setIsAddToCartLoading(false);
      await state.getCart(state.cart.userId);
    })
  },
  deleteFromCart: async (productId: string, skuId: string) => {
    set(async (state: any) => {
      await fetchDeleteFromCart(productId, state.cart.id, skuId)
      await state.getCart(state.cart.userId);
    })
  },
  getCart: async (userId: string) => {
    set({ isCartLoading: true });
    const data = await fetchGetCart(userId);
    set({ isCartLoading: false, cart: { summary: calculateCartSummary(data?.cart?.items), userId: data?.userId, items: data?.cart?.items, id: data?.id } || {} })
  }
}));

export default useCartStore;
