"use client";
import React, { useState } from "react";

import useSWR from "swr";
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
} from "firebase/firestore";
import { db, auth, storage } from "@/lib/firebase/client";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { StateMachineProvider, createStore } from "little-state-machine";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import {
  FormProvider,
  useForm,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";

import CreateSKU from "./CreateSKU";
import BasicDetails from "./BasicDetails";
import AddImages from "./AddImage";
import Stepper from "@/components/common/Seller/Shared/Stepper";

const STEPPER_DATA = [
  {
    title: "Basic Information",
    step: 1,
  },
  {
    title: "Create SKU",
    step: 2,
  },
  {
    title: "Add Image",
    step: 3,
  },
];

type FormValues = {
  coverImage: FileList;
  moreImages: FileList;
  name: string;
  type: string;
  gender: string;
  shop: string;
  description: string;
  price: string;
  quantity: string;
  unit: string;
};

createStore({
  data: {
    coverImage: null,
    moreImages: null,
    name: "",
    type: [],
    gender: "",
    shop: "",
    description: "",
    price: "",
    quantity: "",
    unit: "",
  },
});

const getShopData: any = async (): Promise<any> => {
  const docRef = await getDocs(
    query(
      collection(db, "shops"),
      where("uid", "==", `${auth.currentUser?.uid}`)
    )
  );

  return { id: docRef?.docs[0]?.id, ...docRef?.docs[0]?.data() };
};

const getTypeData = async (category: string) => {
  const typeRef = await getDoc(doc(db, "categorytypes", category));

  return typeRef.data()?.list;
};

const AddProduct = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<FormValues>();
  const { handleSubmit, reset } = methods;

  const {
    data: shop,
    error: shopError,
    isLoading: shopIsLoading,
  } = useSWR("shop", getShopData);

  const {
    data: types,
    error: typesError,
    isLoading: typesIsLoading,
  } = useSWR(
    shop ? ["types", shop.category] : null,
    () => getTypeData(shop.category),
    { shouldRetryOnError: true }
  );

  async function uploadImages(image: any, directory: string) {
    const fileType = image.split(";")[0].split("/")[1];
    const img_data = new (Buffer.from as any)(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    try {
      const storageRef = ref(
        storage,
        `${directory}/image-${Date.now()}.${fileType}`
      );
      const snapshot = await uploadBytes(storageRef, img_data);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (e) {
      console.log(e);
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      if (!data.coverImage) {
        toast.error("Please add Cover Image!");
        return;
      }
      const obj = {
        uid: auth.currentUser?.uid,
        shopId: shop.id,
        shop: shop.name,
        ...data,
        name: data.name?.toLocaleLowerCase(),
        type: data.type?.toLocaleLowerCase(),
        submittedAt: Timestamp.fromDate(new Date()),
        //coverImage: coverImageURL,
        //moreImages: otherImagesURL,
        status: "listed",
      };

      console.log(obj);

      // const coverImageURL = await uploadImages(data.coverImage, "product");
      // const imagePromises = Array.from(data.moreImages, (pic: any) =>
      //   uploadImages(pic, "product")
      // );
      // const otherImagesURL = await Promise.all(imagePromises);

      // const obj = {
      //   uid: auth.currentUser?.uid,
      //   shopId: shop.id,
      //   shop: shop.name,
      //   ...data,
      //   name: data.name?.toLocaleLowerCase(),
      //   type: data.type?.toLocaleLowerCase(),
      //   submittedAt: Timestamp.fromDate(new Date()),
      //   coverImage: coverImageURL,
      //   moreImages: otherImagesURL,
      //   status: "listed",
      // };

      // const userList: any = [];
      // const userRef = await getDocs(
      //   query(
      //     collection(db, "users"),
      //     where("favourites", "array-contains", `${shop.category}`)
      //   )
      // );
      // userRef.forEach((u) => {
      //   userList.push(u.id);
      // });
      // const docRef = await addDoc(collection(db, "products"), obj);
      // updateDoc(doc(db, "shops", `${shop.id}`), {
      //   noOfProducts: increment(1),
      // });
      // addDoc(collection(db, "notifications"), {
      //   productId: docRef.id,
      //   users: userList,
      //   productName: data.name.toLocaleLowerCase(),
      //   coverImage: coverImageURL,
      //   createdAt: Timestamp.fromDate(new Date()),
      // });
      toast.success("Product added!");
      reset();
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=' h-full py-10  '>
      <StateMachineProvider>
        <FormProvider {...methods}>
          <form
            id='add-product-form'
            onSubmit={handleSubmit(onSubmit)}
            className=''
          >
            <Stepper step={step} setStep={setStep} data={STEPPER_DATA} />

            <div className=' w-[90%] sm:wd-[80%] md:w-[65%] lg:w-[45%] m-auto mt-5 '>
              {step === 1 && <BasicDetails setStep={setStep} types={types} />}
              {step === 2 && <CreateSKU setStep={setStep} />}
              {step === 3 && <AddImages setStep={setStep} />}
            </div>
          </form>
        </FormProvider>
      </StateMachineProvider>
      <ToastContainer autoClose={1500} position='bottom-right' />
    </section>
  );
};

export default AddProduct;
