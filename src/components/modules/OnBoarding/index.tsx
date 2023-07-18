import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { db, auth } from "@/lib/firebase/client";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import { updateProfile } from "firebase/auth";

import toast from "react-hot-toast";

import { useRole } from "@/hooks/useUserRole";

import BasicDetails from "@/components/modules/OnBoarding/BasicDetails";
import Categories from "@/components/modules/OnBoarding/Categories";
import Influencer from "@/components/modules/OnBoarding/Influencer";
import UploadImage from "@/utils/handlers/image/UploadImage";

type FormValues = {
  countryCode: string;
  phone: string;
  zipcode: number;
  country: string;
  city: string;
  address: string;
  favourites?: string[];
  topics?: string[];
  socialMediaLinks?: string[];
  image?: any;
};

const OnBoardingForm = () => {
  const router = useRouter();
  const role = useRole();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const obj = {
        ...data,
        zipcode: Number(data.zipcode),
        country: data.country.toLowerCase(),
        city: data.city.toLowerCase(),
        address: data.address.toLowerCase(),
        name: auth.currentUser?.displayName?.toLowerCase(),
        email: auth.currentUser?.email,
        role: role,
        createdAt: Timestamp.fromDate(new Date()),
      };
      if (data.image) {
        const url = await UploadImage({
          collection: "users",
          image: data.image,
          name: auth.currentUser?.uid,
        });
        updateProfile(auth.currentUser!, {
          photoURL: url,
        });
        Object.assign(obj, { photoURL: url });
      }
      delete obj.image;
      await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), obj);
      if (role === "buyer") router.push("/");
      else router.push("/dashboard");
    } catch (error: any) {
      toast.error(`Error! ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (label: string) => (
    <button
      type="submit"
      disabled={loading}
      className="bg-neutral-800 mt-3 hover:bg-neutral-900 rounded-md duration-300 transition-colors w-full text-white py-2.5"
    >
      {loading ? "Please wait..." : label}
    </button>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <BasicDetails setStep={setStep} role={role} />
            {role === "seller" && renderButton("Finish")}
          </>
        )}
        {step === 2 && role === "buyer" && (
          <>
            <Categories />
            {renderButton("Finish")}
          </>
        )}
        {step === 2 && role === "influencer" && (
          <>
            <Influencer />
            {renderButton("Finish")}
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default OnBoardingForm;
