import React from "react";

import { useFormContext } from "react-hook-form";
import Title from "../../Shared/Title";

const UNITS = [
  { id: "ml", label: "Milli-litre" },
  { id: "l", label: "Litre" },
  { id: "g", label: "Gram" },
  { id: "kg", label: "Kilogram" },
  { id: "size", label: "Size" },
];

type Props = {
  types: String[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const BasicDetails = ({ types, setStep }: Props) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  console.log(types);

  const nextStep = async () => {
    const isValid = await trigger([
      "name",
      "type",
      "gender",
      "unit",
      "type",
      "description",
    ]);
    if (isValid) setStep((e: number) => e + 1);
  };

  return (
    <>
      <Title title='Basic Details' />
      <div className='space-y-1 w-full mt-3'>
        <label className=' font-medium  text-gray-600'>Product Name</label>
        <input
          className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          type='text'
          placeholder='Your Product Name'
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>
            Product Name doesn`t look valid
          </span>
        )}
      </div>
      <div className='space-y-1 mt-3 w-full'>
        <label className='font-medium  text-gray-600'>Product Types</label>
        <select
          className='w-full rounded-xl border-[2px] border-gray-300  p-2.5  placeholder:text-sm hover:border-killarney-700 focus:outline-killarney-700'
          {...register("type", { required: true })}
          defaultValue={"Select"}
        >
          <option value='Select' disabled>
            Select Type
          </option>
          {types?.map((c: any, index: number) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.type && (
          <span className='text-sm text-red-500'>
            Please select product type
          </span>
        )}
      </div>

      <div className='w-full mt-3'>
        <label className='font-medium text-gray-600'>Gender</label>
        <div className='flex flex-wrap gap-3 w-full'>
          {["Male", "Female", "Unisex"].map((s, index) => (
            <div className='flex items-center gap-x-2 mt-1' key={index}>
              <input
                id={index.toString()}
                type='radio'
                value={s}
                {...register("gender", { required: true })}
                defaultChecked={index === 0 ? true : false}
                className='peer/gender accent-primary  w-4 h-4 bg-gray-100 border-gray-300 focus:ring-primary'
              />
              <label
                htmlFor={index.toString()}
                className='peer-checked/gender:text-primary text-sm font-medium'
              >
                {s}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full mt-3'>
        <label className='font-medium text-gray-600'>Select Unit</label>
        <div className='flex flex-wrap gap-3 w-full'>
          {UNITS.map((s, index) => (
            <div className='flex items-center gap-x-2 mt-1' key={index}>
              <input
                id={s.id}
                type='radio'
                value={s.id}
                {...register("unit", { required: true })}
                defaultChecked={index === 0 ? true : false}
                className='peer/unit accent-primary w-4 h-4 bg-gray-100 border-gray-300 focus:ring-primary'
              />
              <label
                htmlFor={s.id}
                className='peer-checked/unit:text-primary text-sm font-medium '
              >
                {s.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='space-y-1 mt-3 w-full'>
        <label className='font-medium text-gray-600'>Description</label>
        <textarea
          rows={4}
          className='resize-none w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm overflow-y-auto hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
          placeholder='Enter your product description'
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <span className='text-sm text-red-500'>
            Description doesn`t look valid
          </span>
        )}
      </div>
      <button
        type='button'
        onClick={nextStep}
        className='w-full py-2.5  border border-white hover:border-primary hover:text-primary hover:bg-white duration-500 transition-colors rounded-lg text-white bg-primary mt-2'
      >
        Next
      </button>
    </>
  );
};

export default BasicDetails;
