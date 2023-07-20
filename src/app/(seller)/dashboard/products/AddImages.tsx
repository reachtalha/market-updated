import React, { useState } from "react";

import Image from "next/image";

import { useFormContext } from "react-hook-form";

import { handleImage, handleImages } from "@/common/components/functions";

import { toast } from "react-toastify";
import { Trash } from "lucide-react";

function AddImages({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [pictures, setPictures] = useState<any>([]);
  const [coverImage, setCoverImage] = useState<any>();

  const { setValue } = useFormContext();

  const handleImageUpload = (e: any) => {
    try {
      handleImages(e, 4, pictures, setPictures);
    } catch (e) {
      toast.error(`Error! ${e.message}`);
    }
  };

  const handleCoverImage = (e: any) => {
    try {
      handleImage(e.target.files[0], setCoverImage);
    } catch (e) {
      toast.error(`Error! ${e.message}`);
    }
  };
  return (
    <>
      <div>
        <div className="relative h-fit w-full rounded-lg border p-5 2xl:border-2">
          <h4 className="text-lg font-semibold 2xl:text-xl">Add Photos here</h4>
          <p className="text-sm text-neutral-600 mb-6">
            Files Supported: JPG,JPEG, PNG, Webp
            <br />
            Maximum Size: 10MB
          </p>

          <label htmlFor="cover-image" className="text-sm text-gray-600">
            Cover Image
          </label>
          <input
            id="cover-image"
            type="file"
            className="block mb-4 w-fit text-sm text-gray-500 file:mr-4 file:rounded-full file:border file:border-killarney-600 file:bg-killarney-50 file:py-2 file:px-5 file:text-sm file:font-medium file:text-killarney-600  hover:file:bg-killarney-100"
            onChange={handleCoverImage}
          />

          <label htmlFor="image-file" className="text-sm text-gray-600">
            Other Images
          </label>
          <input
            id="image-file"
            type="file"
            className="block w-fit text-sm text-gray-500 file:mr-4 file:rounded-full file:border file:border-killarney-600 file:bg-killarney-50 file:py-2 file:px-5 file:text-sm file:font-medium file:text-killarney-600  hover:file:bg-killarney-100"
            onChange={handleImageUpload}
            multiple
          />
        </div>
        {(coverImage || pictures?.length > 0) && (
          <div className="mt-2 h-fit w-full border rounded-lg py-2 px-5">
            <h6 className="mb-2 text-lg font-medium 2xl:text-xl">
              Image Preview:
            </h6>
            <div className="flex gap-x-2">
              <div className={coverImage ? "h-24 w-24" : "hidden"}>
                <Image
                  title="Cover Image"
                  src={coverImage}
                  height={80}
                  width={70}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {pictures?.map((pic, index) => (
                <div key={index} className="relative h-24 w-24">
                  <button
                    className="absolute -top-1 -right-1 z-10 bg-red-200  rounded-full p-1"
                    onClick={() =>
                      setPictures(pictures?.filter((e, i) => i !== index))
                    }
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </button>
                  <Image
                    src={pic}
                    height={80}
                    width={70}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {setValue("coverImage", coverImage)}
      {setValue("moreImages", pictures)}
      <div className="mt-5 flex space-x-3">
        <button
          type="button"
          onClick={() => setStep((prev) => prev - 1)}
          className="w-full py-2.5 bg-killarney-100 hover:bg-killarney-200 duration-300 transition-colors rounded-md text-black"
        >
          Back
        </button>
        <button
          type="submit"
          form="add-product-form"
          className="w-full py-2.5 bg-killarney-700 hover:bg-killarney-800 duration-300 transition-colors rounded-md text-white"
        >
          Add Product
        </button>
      </div>
    </>
  );
}

export default AddImages;
