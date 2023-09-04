import { create } from 'zustand';
import { db, auth } from '@/lib/firebase/client';
import {
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

const fetchClearCart = async (cartItems: any) => {
  try {
    if (cartItems.length > 0) {
      Promise.all(
        cartItems.map(async (item: any) => {
          await fetchDeleteFromCart(item.itemId, auth?.currentUser?.uid || "");
        })
      );
    }
  }catch(err){
    console.log(err);
  }
};

export const calculateCartSummary = (items: any = []) => {
  const subTotal = items.reduce((sum: number, item: any) => {
    const itemTotal = item.quantity * item.selectedVariant?.price;
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
    id: '',
    items: [],
    summary: null
  },
  isCartLoading: false,
  showCartPopover: false,
  isQuantityChangeLoading: false,
  updatingDocId: "",
  isAddToCartLoading: false,
  setShowCartPopover: (value: boolean) => set({ showCartPopover: value }),
  setIsAddToCartLoading: (val: boolean) => {
    set({ isAddToCartLoading: val });
  },
  clearCart: async () => {
    set(async (state: any) => {
      await fetchClearCart(state.cart.items);
      await state.getCart();
    });
  },
  addToCart: async (productId: string, skuId: string) => {
    set(async (state: any) => {
      state.setIsAddToCartLoading(true);
      await fetchAddToCart(productId, skuId);
      state.setIsAddToCartLoading(false);
      await state.getCart();
      state.setShowCartPopover(true);
    });
  },
  deleteFromCart: async (docId: string) => {
    set(async (state: any) => {
      await fetchDeleteFromCart(docId, state.cart.id);
      await state.getCart(false);
    });
  },
  getCart: async (isCartLoading: boolean = true) => {
    set({ isCartLoading });
    const data = await fetchGetCart();
    set({
      isCartLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  },
  increment: async (docId: string) => {
    set({ isQuantityChangeLoading: true, updatingDocId: docId });
    await incrementQuantity(docId);
    const data = await fetchGetCart();
    set({
      isQuantityChangeLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  },
  decrement: async (docId: string) => {
    set({ isQuantityChangeLoading: true, updatingDocId: docId });
    await decrementQuantity(docId);
    const data = await fetchGetCart();
    set({
      isQuantityChangeLoading: false,
      cart:
        {
          summary: calculateCartSummary(data?.cart?.items),
          items: data?.cart?.items,
          id: data?.id
        } || {}
    });
  }
}));

export default useCartStore;
