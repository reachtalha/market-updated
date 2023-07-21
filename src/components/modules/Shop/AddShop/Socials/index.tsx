import React from "react";

import { useFormContext } from "react-hook-form";
import Title from "@/components/common/Seller/Shared/Title";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Index = ({ setStep }: Props) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const nextStep = async () => {
    const isValid = await trigger([
      "fbUrl",
      "websiteUrl",
      "twitterUrl",
      "instaUrl",
    ]);
    if (isValid) setStep((e: number) => e + 1);
  };
  return (
    <>
      <Title title='Shop Socials' subTitle={"(Optional)"} />
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Facebook URL</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter Facebook URL'
          {...register("fbUrl")}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>URL doesn`t look valid</span>
        )}
      </div>
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Instagram URL</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter Instagram URL'
          {...register("instaUrl")}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>URL doesn`t look valid</span>
        )}
      </div>
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Twitter URL</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter Twitter URL'
          {...register("twitterUrl")}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>URL doesn`t look valid</span>
        )}
      </div>
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Website URL</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter Website URL'
          {...register("websiteUrl")}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>URL doesn`t look valid</span>
        )}
      </div>
      <div className='flex gap-x-2 mt-4'>
        <button
          type='button'
          onClick={() => setStep((prev) => prev - 1)}
          className='w-full py-2.5 bg-gray-200 hover:bg-killarney-200 duration-300 transition-colors rounded-md text-black'
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className='disabled:cursor-not-allowed w-full py-2.5 bg-primary hover:bg-killarney-800 duration-300 transition-colors rounded-md text-white'
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Index;
