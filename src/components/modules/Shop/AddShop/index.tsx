'use client';
import React, { useState, useEffect } from 'react';

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
  addDoc,
  setDoc
} from 'firebase/firestore';
import { db, auth, storage } from '@/lib/firebase/client';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import toast from 'react-hot-toast';

import { FormProvider, useForm, useFormContext, SubmitHandler } from 'react-hook-form';

import Socials from '@/components/modules/Shop/AddShop/Socials';
import ShopInformation from '@/components/modules/Shop/AddShop/ShopInformation';

import AddImages from '@/components/modules/Shop/AddShop/AddImages';

import Stepper from '@/components/common/Seller/Shared/Stepper';
import Loader from '@/components/common/Loader';

import { List, Link, Image } from 'lucide-react';
import EditNavbar from '@/components/common/Seller/Shared/EditNavbar';
import UploadImage from '@/utils/handlers/image/UploadImage';

const STEPPER_DATA = [
  {
    title: 'Shop Information',
    step: 1,
    icon: <List size={16} />
  },
  {
    title: 'Shop Socials',
    step: 2,
    icon: <Link size={16} />
  },
  {
    title: 'Add Images',
    step: 3,
    icon: <Image size={16} />
  }
];

type FormValues = {
  id: string;
  coverImage: string;
  logoImage: string;
  name: string;
  tagline: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  fbUrl?: string;
  instaUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
};
const getShopData: any = async (): Promise<any> => {
  const docRef = await getDocs(
    query(collection(db, 'shops'), where('uid', '==', `${auth.currentUser?.uid}`))
  );

  return { id: docRef?.docs[0]?.id, ...docRef?.docs[0]?.data() };
};

const getTypeData = async (category: string) => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let types: string[] = [];
  querySnapshot.forEach((doc) => types.push(doc.data().title));
  return types;
};

const AddShop = ({ defaultValues }: { defaultValues: FormValues }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(defaultValues.id !== '');

  const methods = useForm<FormValues>({
    defaultValues,
    shouldUnregister: false
  });
  const { handleSubmit, reset } = methods;

  const {
    data: types,
    error: typesError,
    isLoading: typesIsLoading
  } = useSWR('types', getTypeData);

  function normalize(text: string) {
    return text.replace(/[\u2018\u2019\u201C\u201D]/g, "'");
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.coverImage) {
      toast.error('Please add cover image!');
      return;
    }
    if (!data.logoImage) {
      toast.error('Please add logo!');
      return;
    }
    setLoading(true);

    let coverImageURL = data.coverImage;
    let logoURL = data.logoImage;
    if (!data.coverImage.includes('firebasestorage.googleapis.com')) {
      coverImageURL = await UploadImage({
        collection: 'shops',
        image: data.coverImage,
        name: 'cover'
      });
    }
    if (!data.logoImage.includes('firebasestorage.googleapis.com')) {
      logoURL = await UploadImage({
        collection: 'shops',
        image: data.logoImage,
        name: 'logo'
      });
    }

    try {
      if (isEdit) {
        await updateDoc(doc(db, 'shops', defaultValues.id), {
          uid: auth.currentUser?.uid,
          tagline: data.tagline,
          name: normalize(data.name).toLocaleLowerCase(),
          category: data.category.toLocaleLowerCase(),
          shopAddress: data.address.toLocaleLowerCase(),
          email: data.email.toLocaleLowerCase(),
          phone: data.phone,
          facebookURL: data.fbUrl,
          instaURL: data.instaUrl,
          twitterURL: data.twitterUrl,
          websiteURL: data.websiteUrl,
          updatedAt: Timestamp.fromDate(new Date()),
          coverImage: coverImageURL,
          logo: logoURL
        });
      } else {
        await addDoc(collection(db, 'shops'), {
          uid: auth.currentUser?.uid,
          tagline: data.tagline,
          name: normalize(data.name).toLocaleLowerCase(),
          category: data.category.toLocaleLowerCase(),
          shopAddress: data.address.toLocaleLowerCase(),
          email: data.email.toLocaleLowerCase(),
          phone: data.phone,
          facebookURL: data.fbUrl,
          instaURL: data.instaUrl,
          twitterURL: data.twitterUrl,
          websiteURL: data.websiteUrl,
          noOfProducts: 0,
          coverImage: coverImageURL,
          logo: logoURL,
          submittedAt: Timestamp.fromDate(new Date())
        });
      }

      reset();

      setStep(1);
      toast.success(`Shop ${isEdit ? 'updated' : 'created'} Successfully`);

      window.location.reload();
    } catch (e) {
      toast.error('Error while creating shop');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={` h-full ${!isEdit && 'py-10'}  `}>
      <FormProvider {...methods}>
        <form id="add-shop-form" onSubmit={handleSubmit(onSubmit)} className="">
          {isEdit ? (
            <EditNavbar step={step} setStep={setStep} data={STEPPER_DATA} />
          ) : (
            <Stepper step={step} data={STEPPER_DATA} />
          )}

          <div className=" w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] m-auto mt-5">
            {step === 1 && <ShopInformation setStep={setStep} types={types as string[]} />}
            {step === 2 && <Socials setStep={setStep} />}
            {step === 3 && (
              <AddImages
                setStep={setStep}
                images={{
                  coverImage: defaultValues.coverImage,
                  logoImage: defaultValues.logoImage
                }}
                isEdit={isEdit}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddShop;
