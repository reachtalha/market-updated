'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
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
import { List, Package2, Image, FileText } from 'lucide-react';

import DeleteImage from '@/utils/handlers/image/DeleteImage';

import CreateSKU from './CreateSKU';
import DetailedDescription from './DetailedDescription';
import BasicDetails from './BasicDetails';
import AddImages from './AddImage';
import Stepper from '@/components/common/Seller/Shared/Stepper';
import UploadImage from '@/utils/handlers/image/UploadImage';
import Loader from '@/components/common/Loader';
import EditNavbar from '@/components/common/Seller/Shared/EditNavbar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

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
  rating: number;
  SKU: any[];
};

type props = {
  defaultValues?: any;
  isEdit?: boolean;
  dictionary: any;
};

const AddProduct = ({ dictionary, defaultValues, isEdit }: props) => {
  const {
    data: shop,
    error,
    isLoading
  } = useSWR<any>('seller-shop', async () => {
    const docRef = await getDocs(
      query(collection(db, 'shops'), where('uid', '==', `${auth.currentUser?.uid}`))
    );
    if (docRef.docs[0].exists()) {
      const typeRef = await getDocs(
        query(
          collection(db, 'categories'),
          where('title', '==', `${docRef.docs[0].data().category}`)
        )
      );
      return {
        id: docRef.docs[0].id,
        ...docRef.docs[0].data(),
        types: typeRef?.docs[0]?.data().list
      } as any;
    }
    return false;
  });
  const { user } = useCurrentUser();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { emptySKUList, setInitialSKUList } = useGlobalStore() as any;
  const methods = useForm<FormValues>({ defaultValues, shouldUnregister: false });
  const { handleSubmit, reset } = methods;

  const STEPPER_DATA = [
    {
      title: dictionary.seller.newProduct.stepper.basicInfoLabel,
      step: 1,
      icon: <List size={16} />
    },
    {
      title: dictionary.seller.newProduct.stepper.createSkuLabel,
      step: 2,
      icon: <Package2 size={16} />
    },
    {
      title: dictionary.seller.newProduct.stepper.detailedDescriptionLabel,
      step: 3,
      icon: <FileText size={16} />
    },
    {
      title: dictionary.seller.newProduct.stepper.addImageLabel,
      step: 4,
      icon: <Image size={16} />
    }
  ];

  useEffect(() => {
    if (isEdit) {
      setInitialSKUList(defaultValues?.SKU);
    } else emptySKUList();
  }, []);

  const updateProduct = async (
    data: any,
    coverImageURL: string | undefined,
    otherImagesURL: string[]
  ) => {
    const product = {
      ...data,
      name: data.name?.toLocaleLowerCase(),
      type: data.type?.toLocaleLowerCase(),
      updatedAt: Timestamp.fromDate(new Date()),
      coverImage: coverImageURL || defaultValues.coverImage,
      moreImages: otherImagesURL,
      price:
        data.SKU.length === 1
          ? data.SKU[0].price
          : data.SKU.sort((a: any, b: any) => a.price - b.price)[0].price
    };
    await updateDoc(doc(db, 'products', `${defaultValues.id}`), product);
  };

  const addNewProduct = async (
    data: any,
    coverImageURL: string | undefined,
    otherImagesURL: string[]
  ) => {
    const obj = {
      uid: auth.currentUser?.uid,
      stripeConnectId: user?.stripeConnectId,
      shopId: shop.id,
      ...data,
      name: data.name?.toLocaleLowerCase(),
      type: data.type?.toLocaleLowerCase(),
      submittedAt: Timestamp.fromDate(new Date()),
      coverImage: coverImageURL,
      moreImages: otherImagesURL,
      shopName: shop.name,
      price:
        data.SKU.length === 1
          ? data.SKU[0].price
          : data.SKU.sort((a: any, b: any) => a.price - b.price)[0].price,
      category: shop.category,
      status: 'listed',
      rating: 0
    };

    await addDoc(collection(db, 'products'), obj);
    await updateDoc(doc(db, 'shops', `${shop.id}`), {
      noOfProducts: increment(1)
    });
  };

  const handleSubmissionError = async (
    error: any,
    coverImageURL: string | undefined,
    otherImagesURL: string[] | undefined
  ) => {
    toast.error('Something went wrong!');
    if (coverImageURL) {
      try {
        await DeleteImage({ imageUrl: coverImageURL });
      } catch (rollbackError) {
        console.error('Cover Image rollback Error:', rollbackError);
      }
    }

    if (otherImagesURL && otherImagesURL.length > 0) {
      const deletePromises = otherImagesURL.map((imageUrl) => {
        return DeleteImage({ imageUrl });
      });

      try {
        await Promise.all(deletePromises);
      } catch (rollbackError) {
        console.error('Other Images rollback Error:', rollbackError);
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let coverImageURL;
    let otherImagesURL;

    try {
      setLoading(true);

      // Validate form data
      if (!data.coverImage) {
        toast.error('Please add a Cover Image!');
        return;
      }

      // Upload cover image if it's not already hosted
      if (!data.coverImage.includes('firebasestorage.googleapis.com')) {
        coverImageURL = await UploadImage({
          collection: 'products',
          image: data.coverImage,
          name: 'cover' + new Date().getTime()
        });
      }

      // Upload other images
      const imagePromises = Array.from(data.moreImages, async (pic: any) => {
        if (!pic.includes('firebasestorage.googleapis.com')) {
          return await UploadImage({
            collection: 'products',
            image: pic,
            name: 'product' + new Date().getTime()
          });
        }
        return pic;
      });
      otherImagesURL = await Promise.all(imagePromises);

      // Handle edit or add new product
      if (isEdit) {
        await updateProduct(data, coverImageURL, otherImagesURL);
        toast.success('Product Updated!');
        window.location.reload();
      } else await addNewProduct(data, coverImageURL, otherImagesURL);
      toast.success('Product Added!');
      setStep(1);

      // Reset form and state
      emptySKUList();
      reset();
    } catch (error) {
      handleSubmissionError(error, coverImageURL, otherImagesURL);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loader className="h-full w-full grid place-content-center" />;
  }

  if (!shop && !isEdit)
    return (
      <div className="h-full w-full grid place-content-center text-gray-500">
        {dictionary.seller.newProduct.noShopLabel}
      </div>
    );
  return (
    <section className="h-full py-10">
      <FormProvider {...methods}>
        <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="m-auto max-w-2xl">
          {isEdit ? (
            <EditNavbar setStep={setStep} step={step} data={STEPPER_DATA} />
          ) : (
            <Stepper addProduct step={step} data={STEPPER_DATA} />
          )}

          <div className="w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] xl:w-[60%] mx-auto mt-5 2xl:mt-16 pb-5">
            {step === 1 && (
              <BasicDetails
                dictionary={dictionary}
                isEdit={isEdit}
                setStep={setStep}
                types={shop.types}
              />
            )}
            {step === 2 && <CreateSKU dictionary={dictionary} isEdit={isEdit} setStep={setStep} />}
            {step === 3 && <DetailedDescription isEdit={isEdit} setStep={setStep} />}
            {step === 4 && (
              <AddImages
                dictionary={dictionary}
                isEdit={isEdit}
                images={{
                  coverImage: defaultValues?.coverImage || '',
                  moreImages: defaultValues?.moreImages || []
                }}
                setStep={setStep}
                loading={loading}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default AddProduct;
