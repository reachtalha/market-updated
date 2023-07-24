import React, { useState } from "react";

import Image from "next/image";

import { useFormContext } from "react-hook-form";

import { handleImage, handleImages } from "@/components/common/functions";

import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import Title from "@/components/common/Seller/Shared/Title";

const ImageUpload = ({
  label,
  onUpload,
}: {
  label: string;
  onUpload: Function;
}) => {
  return (
    <>
      <label
        htmlFor={label.replace(" ", "-")}
        className='text font-medium  text-gray-600'
      >
        {label}
      </label>
      <input
        id={label.replace(" ", "-")}
        type='file'
        className='block mb-4 mt-1 w-fit text-sm font-medium text-gray-500 file:mr-4 file:rounded-full file:border file:border-killarney-600 file:bg-killarney-50 file:py-2 file:px-5 file:text-sm file:font-medium file:text-killarney-600  hover:file:bg-killarney-100'
        onChange={onUpload as any}
      />
    </>
  );
};

function AddImages({
  setStep,
  isShop,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isShop?: boolean;
}) {
  const [pictures, setPictures] = useState<any>([]);
  const [coverImage, setCoverImage] = useState<any>();
  const [logoImage, setLogoImage] = useState<any>();

  const { setValue } = useFormContext();

  const handleImageUpload = (e: any) => {
    try {
      if (isShop) {
        handleImage(e.target.files[0], setLogoImage);
      } else {
        handleImages(e, 4, pictures, setPictures);
      }
    } catch (e: any) {
      toast.error(`Error! ${e.message}`);
    }
  };

  const handleCoverImage = (e: any) => {
    try {
      handleImage(e.target.files[0], setCoverImage);
    } catch (e: any) {
      toast.error(`Error! ${e.message}`);
    }
  };
  return (
    <>
      <Title title='Add Images' />
      <div className='mt-2'>
        <div className='relative h-fit w-full rounded-lg border p-5 2xl:border-2'>
          <p className='text-sm text-neutral-600 mb-2'>
            <span className='font-medium'>Files Supported</span>: JPG,JPEG, PNG,
            Webp
            <br />
            <span className='font-medium'> Maximum Size</span>: 10MB
          </p>

          <ImageUpload label='Cover Image' onUpload={handleCoverImage} />
          <ImageUpload
            label={isShop ? "Logo Image" : "Other Images"}
            onUpload={handleImageUpload}
          />
        </div>
        {(coverImage || pictures?.length > 0) && (
          <div className='mt-2 h-fit w-full border rounded-lg py-2 px-5'>
            <h6 className='mb-2 text-lg font-medium text-gray-600 2xl:text-xl'>
              Image Preview
            </h6>
            <div className='flex gap-x-2'>
              <div className={coverImage ? "h-24 w-24 relative" : "hidden"}>
                <button
                  className='absolute top-1 right-1 z-50 bg-red-200  rounded-full p-1'
                  onClick={() => setCoverImage(null)}
                >
                  <Trash2 className='h-3 w-3 text-red-500' />
                </button>
                <Image
                  title='Cover Image'
                  src={coverImage}
                  height={80}
                  width={70}
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
              {isShop ? (
                <div className={logoImage ? "h-24 w-24 relative" : "hidden"}>
                  <button
                    className='absolute top-1 right-1 z-50 bg-red-200  rounded-full p-1'
                    onClick={() => setLogoImage(null)}
                  >
                    <Trash2 className='h-3 w-3 text-red-500' />
                  </button>
                  <Image
                    title='Logo Image'
                    src={logoImage}
                    height={80}
                    width={70}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                </div>
              ) : (
                pictures?.map((pic: any, index: number) => (
                  <div key={index} className='relative h-24 w-24'>
                    <button
                      className='absolute top-1 right-1 bg-red-200  rounded-full p-1'
                      onClick={() =>
                        setPictures(
                          pictures?.filter((e: any, i: number) => i !== index)
                        )
                      }
                    >
                      <Trash2 className='h-3 w-3 text-red-500' />
                    </button>
                    <Image
                      src={pic}
                      height={80}
                      width={70}
                      alt=''
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {setValue("coverImage", coverImage)}

      {isShop
        ? setValue("logoImage", logoImage)
        : setValue("moreImages", pictures)}

      <div className='mt-5 flex  space-x-3'>
        <button
          type='button'
          onClick={() => setStep((prev) => prev - 1)}
          className='w-full py-2.5 bg-gray-200 hover:bg-gray-100 duration-300 transition-colors rounded-md text-black'
        >
          Back
        </button>
        <button
          type='submit'
          form={isShop ? "add-shop-form" : "add-product-form"}
          className='w-full py-2.5 bg-primary hover:bg-killarney-800 duration-300 transition-colors rounded-md text-white'
        >
          {isShop ? "Add Shop" : "Add Product"}
        </button>
      </div>
    </>
  );
}

export default AddImages;
