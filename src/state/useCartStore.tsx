import { create } from 'zustand';
import { db, auth } from '@/lib/firebase/client';
import {
  setDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

const fetchDeleteFromCart = async (productId: string, cartDocId: string, skuId: string) => {
  const cartRef = doc(db, 'cart', cartDocId);
  await updateDoc(cartRef, {
    items: arrayRemove({
      productId,
      skuId,
      quantity: 1
    })
  });
};

const fetchGetCart = async () => {
  const cart = await getDoc(doc(db, 'cart', `${auth.currentUser?.uid}`));

  if (!cart.exists()) {
    await setDoc(doc(db, 'cart', `${auth.currentUser?.uid}`), {
      items: []
    });
  } else {
    const cartData = cart.data();
    const cartItems = await Promise.all(
      cartData?.items?.map(async (item: any) => {
        const docRef = await getDoc(doc(db, 'products', item.productId));
        const productData = docRef.data();
        const selectedVariant = productData?.SKU.find((sku: any) => sku.id === item.skuId);

        return {
          ...item,
          docId: docRef.id,
          selectedVariant,
          image: productData?.coverImage,
          name: productData?.name,
          shopId: productData?.shopId,
          unit: productData?.unit
        };
      })
    );
    return { userId: auth.currentUser?.uid, id: cart.id, cart: { ...cartData, items: cartItems } };
  }
};

const fetchAddToCart = async (productId: string, skuId: string) => {
  const cartRef = doc(db, 'cart', `${auth.currentUser?.uid}`);
  await updateDoc(cartRef, {
    items: arrayUnion({
      productId,
      skuId,
      quantity: 1
    })
  });
};

const fetchClearCart = async () => {
  const cartRef = doc(db, 'cart', `${auth.currentUser?.uid}`);
  await deleteDoc(cartRef);
};

const calculateCartSummary = (items: any = []) => {
  const subTotal = items.reduce((sum: number, item: any) => {
    const itemTotal = item.quantity * item.selectedVariant.price;
    return sum + itemTotal;
  }, 0);
  const shipping = 4;
  return {
    shipping,
    subTotal: subTotal,
    total: subTotal + shipping
  };
};

const incrementQuantity = async (items: any, productId: string) => {
  const newItems = structuredClone(items);
  for (let i = 0; i < newItems.length; i++) {
    if (newItems[i].productId === productId) {
      newItems[i].quantity += 1;
    }
  }
  await updateDoc(doc(db, 'cart', `${auth.currentUser?.uid}`), {
    items: newItems
  });
};
const decrementQuantity = async (items: any, productId: string, variant: string) => {
  const newItems = structuredClone(items);
  for (let i = 0; i < newItems.length; i++) {
    if (newItems[i].productId === productId) {
      if (newItems[i].quantity >= 2) {
        newItems[i].quantity -= 1;
      } else {
        await fetchDeleteFromCart(productId, `${auth.currentUser?.uid}`, variant);
        return;
      }
    }
  }
  await updateDoc(doc(db, 'cart', `${auth.currentUser?.uid}`), {
    items: newItems
  });
};

const useCartStore = create((set, get) => ({
  cart: {
    userId: '',
    id: '',
    items: [],
    summary: null
  },
  isCartLoading: false,
  isAddToCartLoading: false,
  setIsAddToCartLoading: (val: boolean) => {
    set({ isAddToCartLoading: val });
  },
  clearCart: async () => {
    set(async (state: any) => {
      const userId = state?.cart?.userId;
      await fetchClearCart();
      await state.getCart(userId);
    });
  },
  addToCart: async (productId: string, skuId: string) => {
    set(async (state: any) => {
      state.setIsAddToCartLoading(true);
      await fetchAddToCart(productId, skuId);
      state.setIsAddToCartLoading(false);
      await state.getCart(state.cart.userId);
    });
  },
  deleteFromCart: async (productId: string, skuId: string) => {
    set(async (state: any) => {
      await fetchDeleteFromCart(productId, state.cart.id, skuId);
      await state.getCart(state.cart.userId);
    });
  },
  getCart: async (userId: string) => {
    set({ isCartLoading: true });
    const data = await fetchGetCart();
    set({
      isCartLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          userId: data?.userId,
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  },
  increment: async (items: any, productId: string) => {
    set({ isCartLoading: true });
    await incrementQuantity(items, productId);
    const data = await fetchGetCart();
    set({
      isCartLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          userId: data?.userId,
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  },
  decrement: async (items: any, productId: string, variant: string) => {
    set({ isCartLoading: true });
    await decrementQuantity(items, productId, variant);
    const data = await fetchGetCart();
    set({
      isCartLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          userId: data?.userId,
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  }
}));

export default useCartStore;
