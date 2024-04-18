import React, { useState } from 'react';

import Image from 'next/image';

import { useFormContext } from 'react-hook-form';

import { deleteImage, handleImage, handleImages } from '@/components/common/functions';
import { Label } from '@/components/ui/label';

import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import Title from '@/components/common/Seller/Shared/Title';
import { Button } from '@/components/ui/button';
import DeleteImage from '@/utils/handlers/image/DeleteImage';

const ImageUpload = ({ label, onUpload }: { label: string; onUpload: Function }) => {
  return (
    <>
      <Label htmlFor={label.replace(' ', '-')} className="text-base font-medium  text-gray-600">
        {label}
      </Label>
      <input
        id={label.replace(' ', '-')}
        type="file"
        className="block mb-4 mt-1 w-fit text-sm font-medium text-gray-500 file:mr-4 file:rounded-full file:border file:border-killarney-600 file:bg-killarney-50 file:py-2 file:px-5 file:text-sm file:font-medium file:text-killarney-600  hover:file:bg-killarney-100"
        onChange={onUpload as any}
      />
    </>
  );
};

function AddImages({
  setStep,
  isShop,
  images,
  isEdit,
  loading = false,
  dictionary
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isShop?: boolean;
  images?: any;
  isEdit?: boolean;
  loading?: boolean;
  dictionary: any;
}) {
  const [pictures, setPictures] = useState<any>(images?.moreImages);
  const [coverImage, setCoverImage] = useState<any>(images?.coverImage);
  const [logoImage, setLogoImage] = useState<any>(images?.logoImage);

  const { setValue } = useFormContext();

  const handleImageUpload = (e: any) => {
    try {
      if (isShop) {
        handleImage(e.target.files[0], setLogoImage);
      } else {
        handleImages(e, 4, pictures, setPictures);
      }
      e.target.value = '';
    } catch (e: any) {
      toast.error(`Error! ${e.message}`);
    }
  };

  const handleCoverImage = (e: any) => {
    try {
      handleImage(e.target.files[0], setCoverImage);
      e.target.value = '';
    } catch (e: any) {
      toast.error(`Error! ${e.message}`);
    }
  };

  return (
    <>
      <Title title={dictionary.seller.shop.imagesForm.heading} />
      <div className="mt-3 xl:mt-5">
        <div className="relative h-fit w-full rounded-lg border p-5 2xl:border-2">
          <p className="text-sm text-neutral-600 mb-2">
            <span className="font-medium">
              {dictionary.seller.shop.imagesForm.fileSupportedLabel}
            </span>
            : JPG,JPEG, PNG, Webp
            <br />
            <span className="font-medium">
              {dictionary.seller.shop.imagesForm.maximumSizeLabel}
            </span>
            : 10MB
          </p>

          <ImageUpload label="Cover Image" onUpload={handleCoverImage} />
          <ImageUpload
            label={isShop ? 'Logo Image' : 'Other Images'}
            onUpload={handleImageUpload}
          />
        </div>
        {(coverImage || logoImage || pictures?.length > 0) && (
          <div className="mt-2 h-fit w-full border rounded-lg py-2 px-5">
            <h6 className="mb-2 text-lg font-medium text-gray-600 2xl:text-xl">
              {dictionary.seller.shop.imagesForm.imagePreviewLabel}
            </h6>
            <div className="flex gap-x-2">
              <div className={coverImage ? 'h-24 w-24 relative' : 'hidden'}>
                <button
                  className="absolute top-1 right-1 z-50 bg-red-200  rounded-full p-1"
                  type="button"
                  onClick={async () => {
                    const imageUrl = coverImage;
                    setCoverImage(null);
                    await DeleteImage({ imageUrl });
                  }}
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </button>
                {coverImage && (
                  <Image
                    title="Cover Image"
                    src={coverImage}
                    height={80}
                    width={70}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {isShop ? (
                <div className={logoImage ? 'h-24 w-24 relative' : 'hidden'}>
                  <button
                    className="absolute top-1 right-1 z-50 bg-red-200  rounded-full p-1"
                    type="button"
                    onClick={async () => {
                      const imageUrl = logoImage;
                      setLogoImage(null);
                      await DeleteImage({ imageUrl });
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </button>
                  {logoImage && (
                    <Image
                      title="Logo Image"
                      src={logoImage}
                      height={80}
                      width={70}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ) : (
                pictures?.map((pic: any, index: number) => (
                  <div key={index} className="relative h-24 w-24">
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-200  rounded-full p-1"
                      onClick={async () => {
                        const imageUrl = pic;
                        deleteImage(pic, setPictures);
                        await DeleteImage({ imageUrl });
                      }}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </button>
                    <Image
                      src={pic || ''}
                      height={80}
                      width={70}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {setValue('coverImage', coverImage)}

      {isShop ? setValue('logoImage', logoImage) : setValue('moreImages', pictures)}

      <div className="mt-5 xl:mt-8 flex gap-x-3">
        {!isEdit && (
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={() => setStep((prev: any) => prev - 1)}
            className="w-1/2"
          >
            Back
          </Button>
        )}

        <Button
          type="submit"
          variant="default"
          disabled={loading}
          form={isShop ? 'add-shop-form' : 'add-product-form'}
          className={!isEdit ? 'w-1/2' : 'w-full'}
        >
          {(isEdit ? 'Update ' : 'Add ') + (isEdit ? '' : isShop ? 'Shop' : 'Product')}
        </Button>
      </div>
    </>
  );
}

export default AddImages;
