import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, Timestamp, getDoc, doc, updateDoc } from 'firebase/firestore';

const decreaseQuantity = async (docId: string, SKUId: string, quantity: number) => {
  const productRef = await getDoc(doc(db, 'products', docId));
  const SKUs = productRef?.data()?.SKU;
  //decrease quantity of selected SKU
  SKUs.map((sku: any) => {
    if (sku.id === SKUId) {
      sku.quantity -= quantity;
    }
  });
  await updateDoc(doc(db, 'products', docId), {
    SKU: SKUs
  });
};

export async function POST(req: Request) {
  const { order, photoURL, cart } = await req.json();

  try {
    const ordersRef = collection(db, 'orders');
    await addDoc(ordersRef, {
      photoURL,
      timeStamp: Timestamp.fromDate(new Date()),
      ...order
    });
    // TODO: update without using docId for guest checkouts
    cart?.forEach((item: any) => {
      decreaseQuantity(item.docId, item.selectedVariant.skuId, item.selectedVariant.quantity);
    });

    return NextResponse.json({ message: 'Order Recieved' }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
