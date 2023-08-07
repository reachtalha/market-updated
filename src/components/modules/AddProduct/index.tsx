'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
  Timestamp,
  increment,
  updateDoc,
  addDoc
} from 'firebase/firestore';
import { db, auth, storage } from '@/lib/firebase/client';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import useGlobalStore from '@/state';
import { FormProvider, useForm, useFormContext, SubmitHandler } from 'react-hook-form';

import { handleImageUpload } from '@/components/common/functions';
import CreateSKU from './CreateSKU';
import BasicDetails from './BasicDetails';
import AddImages from './AddImage';
import Stepper from '@/components/common/Seller/Shared/Stepper';
import UploadImage from '@/utils/handlers/image/UploadImage';

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
    title: 'Add Image',
    step: 3
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
  price: string;
  quantity: string;
  unit: string;
};

const getShopData: any = async (): Promise<any> => {
  const docRef = await getDocs(
    query(collection(db, 'shops'), where('uid', '==', `${auth.currentUser?.uid}`))
  );

  return { id: docRef?.docs[0]?.id, ...docRef?.docs[0]?.data() };
};

const getTypeData = async (category: string) => {
  const typeRef = await getDocs(
    query(collection(db, 'categories'), where('title', '==', `${category}`))
  );

  return typeRef?.docs[0]?.data().list;
};

const AddProduct = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const emptySKUList = useGlobalStore((state: any) => state.emptySKUList);
  const methods = useForm<FormValues>();
  const { handleSubmit, reset } = methods;

  const { data: shop, error: shopError, isLoading: shopIsLoading } = useSWR('shop', getShopData);

  useEffect(() => {
    emptySKUList();
  }, []);

  const {
    data: types,
    error: typesError,
    isLoading: typesIsLoading
  } = useSWR(shop ? ['types', shop.category] : null, () => getTypeData(shop.category), {
    shouldRetryOnError: true
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

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
        status: 'listed'
      };

      const docRef = await addDoc(collection(db, 'products'), obj);
      updateDoc(doc(db, 'shops', `${shop.id}`), {
        noOfProducts: increment(1)
      });

      toast.success('Product added!');
      emptySKUList();
      reset();
      setStep(1);
    } catch (e) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full py-10">
      <FormProvider {...methods}>
        <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="">
          <Stepper step={step} data={STEPPER_DATA} />

          <div className="w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] mx-auto mt-5 pb-5">
            {step === 1 && <BasicDetails setStep={setStep} types={types} />}
            {step === 2 && <CreateSKU setStep={setStep} />}
            {step === 3 && <AddImages setStep={setStep} />}
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddProduct;
