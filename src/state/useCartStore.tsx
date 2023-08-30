import { create } from 'zustand';
import { db, auth } from '@/lib/firebase/client';
import {
  setDoc,
  arrayRemove,
  arrayUnion,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  increment,
  getDocs
} from 'firebase/firestore';

const fetchDeleteFromCart = async (docId: string, cartDocId: string) => {
  const cartRef = doc(db, 'cart', cartDocId, 'items', docId);
  await deleteDoc(cartRef);
};

const fetchGetCart = async () => {
  const cart = await getDocs(collection(db, 'cart', `${auth.currentUser?.uid}`, 'items'));

  if (cart.docs.length === 0) {
    return {};
  } else {
    const cartItems = await Promise.all(
      cart.docs.map(async (document: any) => {
        const docRef = await getDoc(doc(db, 'products', document.data().productId));
        const productData = docRef.data();
        const selectedVariant = productData?.SKU.find(
          (sku: any) => sku.id === document.data().skuId
        );
       
        return {
          itemId: document.id,
          docId: docRef.id,
          selectedVariant,
          image: productData?.coverImage,
          name: productData?.name,
          shopId: productData?.shopId,
          unit: productData?.unit,
          quantity: document.data().quantity
        };
      })
    );

    return {
      userId: auth.currentUser?.uid,
      id: auth.currentUser?.uid,
      cart: { ...cart, items: cartItems }
    };
  }
};

const fetchAddToCart = async (productId: string, skuId: string) => {
  const cartRef = collection(db, 'cart', `${auth.currentUser?.uid}`, 'items');
  const cartItems = await getDocs(cartRef);

  if (cartItems.docs.length > 0) {
    const isProductExist = cartItems.docs.find((item: any) => item.data().productId === productId);
    if (isProductExist) {
      const isSkuExist = cartItems.docs.find((item: any) => item.data().skuId === skuId);
      if (isSkuExist) {
        await updateDoc(doc(db, 'cart', `${auth.currentUser?.uid}`, 'items', isSkuExist.id), {
          quantity: increment(1)
        });
        return;
      }
    }
  }
  await addDoc(cartRef, {
    productId,
    skuId,
    quantity: 1
  });
};

const fetchClearCart = async (cartId: string) => {
  const cartRef = collection(db, 'cart', `${auth.currentUser?.uid}`, 'items');
  const parentDocSnapshot = await getDocs(cartRef);

  if (parentDocSnapshot.docs.length > 0) {
    Promise.all(
      parentDocSnapshot.docs.map(async (document) => {
        await fetchDeleteFromCart(document.id, cartId);
      })
    );
  }
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

const incrementQuantity = async (docId: string) => {
  await updateDoc(doc(db, 'cart', `${auth.currentUser?.uid}`, 'items', docId), {
    quantity: increment(1)
  });
};
const decrementQuantity = async (docId: string) => {
  const cartItemsRef = doc(db, 'cart', `${auth.currentUser?.uid}`, 'items', docId);
  const cartItems = await getDoc(cartItemsRef);
  if (cartItems.data()?.quantity > 1) {
    await updateDoc(cartItemsRef, {
      quantity: increment(-1)
    });
  } else {
    await fetchDeleteFromCart(docId, `${auth.currentUser?.uid}`);
  }
};

const useCartStore = create((set, get) => ({
  cart: {
    userId: '',
    id: '',
    items: [],
    summary: null
  },
  isCartLoading: false,
  isQuantityChangeLoading: false,
  isAddToCartLoading: false,
  setIsAddToCartLoading: (val: boolean) => {
    set({ isAddToCartLoading: val });
  },
  clearCart: async () => {
    set(async (state: any) => {
      const userId = state?.cart?.userId;
      await fetchClearCart(state.cart.id);
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
  deleteFromCart: async (docId: string) => {
    set(async (state: any) => {
      await fetchDeleteFromCart(docId, state.cart.id);
      await state.getCart(state.cart.userId, false);
    });
  },
  getCart: async (userId: string, isCartLoading: boolean = true) => {
    set({ isCartLoading });
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
  increment: async (docId: string) => {
    set({ isQuantityChangeLoading: true });
    await incrementQuantity(docId);
    const data = await fetchGetCart();
    set({
      isQuantityChangeLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          userId: data?.userId,
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  },
  decrement: async (docId: string) => {
    set({ isQuantityChangeLoading: true });
    await decrementQuantity(docId);
    const data = await fetchGetCart();
    set({
      isQuantityChangeLoading: false,
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
