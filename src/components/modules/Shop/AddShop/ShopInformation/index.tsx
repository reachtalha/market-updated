import React from "react";

import { useFormContext } from "react-hook-form";
import Title from "@/components/common/Seller/Shared/Title";

type Props = {
  types: String[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Index = ({ setStep, types }: Props) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  console.log(types);

  const nextStep = async () => {
    const isValid = await trigger([
      "name",
      "category",
      "tagline",
      "phone",
      "address",
      "email",
    ]);
    if (isValid) setStep((e: number) => e + 1);
  };
  return (
    <>
      <Title title='Shop Details' />
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Shop Name</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter Shop Name'
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>
            Shop Name doesn`t look valid
          </span>
        )}
      </div>
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Tagline</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter tagline'
          {...register("tagline", { required: true })}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>
            Tagline doesn`t look valid
          </span>
        )}
      </div>
      <div className='space-y-1 mt-3 w-full'>
        <label className='font-medium  text-gray-600'>Shop Category</label>
        <select
          className='w-full rounded-xl border-[2px] border-gray-300  p-2.5  placeholder:text-sm hover:border-killarney-700 focus:outline-killarney-700'
          {...register("category", { required: true })}
          defaultValue={"Select"}
        >
          <option value='Select' disabled>
            Select Shop Category
          </option>
          {types?.map((c: any, index: number) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.type && (
          <span className='text-sm text-red-500'>
            Please select Shop Category
          </span>
        )}
      </div>

      <div className='flex space-x-2 flex-row'>
        {" "}
        <div className='space-y-1 w-full mt-3'>
          <label className=' font-medium  text-gray-600'>Email</label>
          <input
            className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
            type='text'
            placeholder='Enter Email'
            {...register("email", { required: true })}
          />
          {errors.name && (
            <span className='text-sm text-red-500'>
              Email doesn`t look valid
            </span>
          )}
        </div>
        <div className='space-y-1 w-full mt-3'>
          <label className=' font-medium  text-gray-600'>Phone</label>
          <input
            className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
            type='text'
            placeholder='Enter Phone Number'
            {...register("phone", { required: true })}
          />
          {errors.name && (
            <span className='text-sm text-red-500'>
              Phone Number doesn`t look valid
            </span>
          )}
        </div>
      </div>
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Address</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Enter Shop Address'
          {...register("address", { required: true })}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>
            Address doesn`t look valid
          </span>
        )}
      </div>

      <button
        type='button'
        onClick={nextStep}
        className='w-full py-2.5   border border-white hover:border-primary hover:text-primary hover:bg-white duration-500 transition-colors rounded-lg text-white bg-primary mt-5'
      >
        Next
      </button>
    </>
  );
};

export default Index;
