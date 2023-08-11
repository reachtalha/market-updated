'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  Timestamp,
  increment,
  updateDoc,
  addDoc
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import toast from 'react-hot-toast';
import useGlobalStore from '@/state';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import CreateSKU from './CreateSKU';
import DetailedDescription from './DetailedDescription';
import BasicDetails from './BasicDetails';
import AddImages from './AddImage';
import Stepper from '@/components/common/Seller/Shared/Stepper';
import UploadImage from '@/utils/handlers/image/UploadImage';
import Loader from '@/components/common/Loader';

const STEPPER_DATA = [
  {
    title: 'Basic Information',
    step: 1
  },
  {
    title: 'Create SKU',
    step: 2
  },
  {
    title: 'Detailed Description',
    step: 3
  },
  {
    title: 'Add Image',
    step: 4
  }
];

type FormValues = {
  coverImage: string;
  moreImages: string[];
  name: string;
  type: string;
  gender: string;
  shop: string;
  description: string;
  detailedDescription: any;
  price: string;
  quantity: string;
  unit: string;
};


const AddProduct = () => {
  const { data: shop, error, isLoading } = useSWR<any>('shop', async () => {
    const docRef = await getDocs(
      query(collection(db, 'shops'), where('uid', '==', `${auth.currentUser?.uid}`))
    );
    if (docRef.docs[0].exists()) {
      const typeRef = await getDocs(
        query(collection(db, 'categories'), where('title', '==', `${docRef.docs[0].data().category}`))
      );
      return {
        id: docRef.docs[0].id,
        ...docRef.docs[0].data(),
        types: typeRef?.docs[0]?.data().list
      } as any;
    }
  });
  const [step, setStep] = useState<number>(1);
  const emptySKUList = useGlobalStore((state: any) => state.emptySKUList);
  const methods = useForm<FormValues>();
  const { handleSubmit, reset } = methods;


  useEffect(() => {
    emptySKUList();
  }, []);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!data.coverImage) {
        toast.error('Please add Cover Image!');
        return;
      }

      const coverImageURL = await UploadImage({
        collection: 'products',
        image: data.coverImage,
        name: 'cover' + new Date().getTime()
      });
      const imagePromises = Array.from(data.moreImages, (pic: any) =>
        UploadImage({
          collection: 'products',
          image: pic,
          name: 'product' + new Date().getTime()
        })
      );
      const otherImagesURL = await Promise.all(imagePromises);

      const obj = {
        uid: auth.currentUser?.uid,
        shopId: shop.id,
        ...data,
        name: data.name?.toLocaleLowerCase(),
        type: data.type?.toLocaleLowerCase(),
        submittedAt: Timestamp.fromDate(new Date()),
        coverImage: coverImageURL,
        moreImages: otherImagesURL,
        shopName: shop.name,
        category: shop.category,
        status: 'listed'
      };

      await addDoc(collection(db, 'products'), obj);
      updateDoc(doc(db, 'shops', `${shop.id}`), {
        noOfProducts: increment(1)
      });

      toast.success('Product added!');
      emptySKUList();
      reset();
      setStep(1);
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  if (isLoading) {
    return <Loader className="h-full w-full grid place-content-center" />
  }
  return (
    <section className="h-full py-10">
      <FormProvider {...methods}>
        <form id="add-product-form" onSubmit={handleSubmit(onSubmit)}>
          <Stepper addProduct step={step} data={STEPPER_DATA} />
          <div className="w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] mx-auto mt-5 pb-5">
            {step === 1 && <BasicDetails setStep={setStep} types={shop.types} />}
            {step === 2 && <CreateSKU setStep={setStep} />}
            {step === 3 && <DetailedDescription setStep={setStep} />}
            {step === 4 && <AddImages setStep={setStep} />}
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddProduct;
