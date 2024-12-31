'use client';
import React, { useState } from 'react';

import useSWR from 'swr';
import { getDocs, collection, doc, Timestamp, updateDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import toast from 'react-hot-toast';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import Socials from '@/components/modules/Shop/AddShop/Socials';
import ShopInformation from '@/components/modules/Shop/AddShop/ShopInformation';

import AddImages from '@/components/modules/Shop/AddShop/AddImages';

import Stepper from '@/components/common/Seller/Shared/Stepper';

import { List, Link, Image } from 'lucide-react';
import EditNavbar from '@/components/common/Seller/Shared/EditNavbar';
import UploadImage from '@/utils/handlers/image/UploadImage';

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

const getTypeData = async (category: string) => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let types: string[] = [];
  querySnapshot.forEach((doc) => types.push(doc.data().title));
  return types;
};

const AddShop = ({ defaultValues, dictionary }: { defaultValues: FormValues; dictionary: any }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(defaultValues.id !== '');

  const methods = useForm<FormValues>({
    defaultValues,
    shouldUnregister: false
  });
  const { handleSubmit, reset } = methods;

  const { data: types } = useSWR('types', getTypeData);

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
        name: 'cover-' + new Date().getTime() + '-' + data.name
      });
    }
    if (!data.logoImage.includes('firebasestorage.googleapis.com')) {
      logoURL = await UploadImage({
        collection: 'shops',
        image: data.logoImage,
        name: 'logo-' + new Date().getTime() + '-' + data.name
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
    } finally {
      setLoading(false);
    }
  };

  const STEPPER_DATA = [
    {
      title: dictionary.seller.shop.stepper.shopInfoLabel,
      step: 1,
      icon: <List size={16} />
    },
    {
      title: dictionary.seller.shop.stepper.shopSocialsLabel,
      step: 2,
      icon: <Link size={16} />
    },
    {
      title: dictionary.seller.shop.stepper.addImagesLabel,
      step: 3,
      icon: <Image size={16} />
    }
  ];
  return (
    <section className="h-full w-full py-10">
      <FormProvider {...methods}>
        <form id="add-shop-form" onSubmit={handleSubmit(onSubmit)} className="max-w-2xl m-auto">
          {isEdit ? (
            <EditNavbar step={step} setStep={setStep} data={STEPPER_DATA} />
          ) : (
            <Stepper step={step} data={STEPPER_DATA} />
          )}

          <div className=" w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] xl:w-[60%] m-auto mt-5 2xl:mt-16">
            {step === 1 && (
              <ShopInformation
                dictionary={dictionary}
                setStep={setStep}
                isEdit={isEdit}
                types={types as string[]}
              />
            )}
            {step === 2 && <Socials dictionary={dictionary} setStep={setStep} isEdit={isEdit} />}
            {step === 3 && (
              <AddImages
                dictionary={dictionary}
                setStep={setStep}
                images={{
                  coverImage: defaultValues.coverImage,
                  logoImage: defaultValues.logoImage
                }}
                isEdit={isEdit}
                loading={loading}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddShop;
