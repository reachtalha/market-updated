"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Country, City } from "country-state-city";

import { ImageIcon } from "@radix-ui/react-icons";
import Image from "@/common/FallbackImage";
import ImageReader from "@/utils/handlers/image/ImageReader";

interface IBasicDetails {
  setStep: Dispatch<SetStateAction<number>>;
  role: string;
}
const BasicDetails = ({ setStep, role }: IBasicDetails) => {
  const [image, setImage] = useState<string>();
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    watch,
  } = useFormContext();
  const selectedCountry = watch("country");

  const handleImageChange = ImageReader({ setImage, size: 5 });

  const nextStep = async () => {
    const isValid = await trigger([
      "address",
      "country",
      "zipcode",
      "phone",
      "city",
    ]);
    if (isValid) {
      setValue("image", image);
      setStep(2);
    }
  };
  return (
    <>
      <div className="mb-3">
        <h4 className="text-primary font-semibold text-2xl">Get Started</h4>
        <p className="text-neutral-600">
          Help us to create a better experience for you
        </p>
      </div>
      <div className="mt-3 w-full">
        <div className="w-fit mx-auto">
          <label
            htmlFor="o-image"
            className="relative cursor-pointer overflow-hidden border-2 h-32 w-36 gap-y-2 rounded-md flex flex-col items-center justify-center border-neutral-500 border-dotted"
          >
            {image ? (
              <Image
                src={image}
                fill
                alt="image"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-neutral-500" />
                <p
                  className={
                    image ? "hidden" : " text-sm text-center block m-0"
                  }
                >
                  Add profile picture
                </p>
              </>
            )}
            <input
              type="file"
              id="o-image"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
      <div className="flex mt-3 flex-col md:flex-row w-full gap-3">
        <div className="w-full md:w-1/2 space-y-1">
          <label className="text-sm text-neutral-600">Country</label>

          <select
            className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:outline-neutral-800"
            {...register("country", {
              required: true,
            })}
            aria-label="select country"
          >
            <option disabled aria-disabled selected>
              Select Country
            </option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                <span>
                  {c.flag}-<span>{c.name}</span>
                </span>
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="text-sm text-red-500">Please select country</span>
          )}
        </div>
        <div className="w-full md:w-1/2 space-y-1">
          <label className="text-sm text-neutral-600">City</label>
          <select
            className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:outline-neutral-800"
            aria-label="select city"
            {...register("city", {
              required: true,
            })}
          >
            <option disabled aria-disabled selected>
              Select City
            </option>
            {City.getCitiesOfCountry(selectedCountry)?.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
          {errors.city && (
            <span className="text-sm text-red-500">Is city spelled right?</span>
          )}
        </div>
      </div>
      <div className="flex mt-3 flex-col md:flex-row w-full gap-3">
        <div className="w-full md:w-1/2 space-y-1">
          <label className="text-sm text-neutral-600">Contact</label>
          <input
            type="text"
            inputMode="tel"
            className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:-translate-y-[2px] focus:outline-neutral-800"
            placeholder="Your Contact"
            {...register("phone", {
              required: true,
            })}
          />
          {errors.phone && (
            <span className="text-sm text-red-500">Make sure its right</span>
          )}
        </div>
        <div className="w-full md:w-1/2 space-y-1">
          <label className="text-sm text-neutral-600">Zipcode</label>
          <input
            type="text"
            inputMode="numeric"
            className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:-translate-y-[2px] focus:outline-neutral-800"
            placeholder="Your Zipcode"
            {...register("zipcode", {
              required: true,
            })}
          />
          {errors.zipcode && (
            <span className="text-sm text-red-500">Make sure its right</span>
          )}
        </div>
      </div>
      <div className="w-full mt-3 space-y-1">
        <label className="text-sm text-neutral-600">Address</label>
        <input
          type="text"
          inputMode="text"
          className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:-translate-y-[2px] focus:outline-neutral-800"
          placeholder="Your Address"
          {...register("address", {
            required: true,
          })}
        />
        {errors.address && (
          <span className="text-sm text-red-500">
            Is your address spelled right?
          </span>
        )}
      </div>
      {role !== "seller" && (
        <button
          type="button"
          onClick={nextStep}
          className="bg-neutral-800 mt-3 hover:bg-neutral-900 rounded-md duration-300 transition-colors w-full text-white py-2.5"
        >
          Next
        </button>
      )}
    </>
  );
};

export default BasicDetails;
