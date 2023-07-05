"use client";

import React, { useState, useEffect } from "react";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { db, auth } from "@/lib/firebase/client";
import { doc, getDoc, setDoc, Timestamp } from "@firebase/firestore";
import { updateProfile } from "firebase/auth";

import { useRole } from "@/hooks/useUserRole";

import toast from "react-hot-toast";

import UploadImage from "@/utils/handlers/image/UploadImage";
import BasicDetails from "@/modules/OnBoarding/BasicDetails";
import Categories from "@/modules/OnBoarding/Categories";
import Influencer from "@/modules/OnBoarding/Influencer";

type FormValues = {
  contact: string;
  zipcode: number;
  country: string;
  city: string;
  address: string;
  categories?: string[];
  fb?: string;
  twitter?: string;
  linkedin?: string;
  image?: any;
};

const OnBoardingForm = () => {
  const role = useRole();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setLoading(true);
      const obj = {
        ...data,
        zipcode: Number(data.zipcode),
        country: data.country.toLocaleLowerCase(),
        city: data.city.toLocaleLowerCase(),
        address: data.address.toLocaleLowerCase(),
        name: auth.currentUser?.displayName?.toLocaleLowerCase(),
        email: auth.currentUser?.email,
        role: role,
        createdAt: Timestamp.fromDate(new Date()),
      };
      if (role === "buyer") {
        Object.assign(obj, { favourites: data.selected });
      }
      // if (data.image) {
      // const url = await UploadImage({
      //   collection: "users",
      //   image: data.image,
      //   name: auth.currentUser?.uid,
      // });
      // updateProfile(auth.currentUser, {
      //   photoURL: url,
      // });
      // Object.assign(obj, { photoURL: url });
      // }
      console.log(obj);
      // await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), obj);
      // router.push("/");
    } catch (error: any) {
      toast.error(`Error! ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 1 && <BasicDetails setStep={setStep} role={role} />}
          {step === 2 && role === "buyer" && (
            <>
              <Categories />
              <button
                type="submit"
                disabled={loading}
                className="bg-neutral-800 mt-3 hover:bg-neutral-900 rounded-md duration-300 transition-colors w-full text-white py-2.5"
              >
                {loading ? "Please wait..." : "Finish"}
              </button>
            </>
          )}
          {step === 2 && role === "influencer" && (
            <>
              <Influencer />
              <button
                type="submit"
                disabled={loading ? true : false}
                className="bg-killarney-700 mt-3 hover:bg-killarney-800 rounded-md duration-300 transition-colors w-full text-white py-2.5"
              >
                {loading ? "Please wait..." : "Finish"}
              </button>
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default OnBoardingForm;
