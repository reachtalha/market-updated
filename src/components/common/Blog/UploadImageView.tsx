'use client';
import { CrossIcon, UploadIcon, XIcon } from 'lucide-react';
import { handleImage } from '@/components/common/functions';
import UploadImage from '@/utils/handlers/image/UploadImage';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

type UploadImageProps = {
  onUploadSuccess: any;
  value: string;
  isLoading: boolean;
  setIsLoading: Function;
};
export default function UploadImageView({
  value,
  onUploadSuccess,
  isLoading,
  setIsLoading
}: UploadImageProps) {
  const [url, setURL] = useState<string>(value);

  const handleUploadImage = async (base64Image: string) => {
    try {
      setIsLoading(true);
      const resp = await UploadImage({
        collection: 'blogs',
        image: base64Image,
        name: 'blog-' + new Date().getTime()
      });

      onUploadSuccess(resp);
      setURL(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setURL('');
  };
  const handleFileSelect = (e: any) => {
    handleImage(e.target.files[0], handleUploadImage);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {isLoading ? (
        <Skeleton className="h-[120px] w-full bg-gray-200" />
      ) : (
        <>
          {url !== '' ? (
            <div className="flex justify-between rounded-md items-center p-4 border w-full">
              <Image
                alt={url}
                src={url}
                height={50}
                width={50}
                className="w-[50px] h-[50px] object-cover rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="m-0 p-2 rounded-md shadow-lg border bg-white"
              >
                <XIcon height={16} width={16} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-[120px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="mb-3" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported files are jpg, jpeg, png, webp
                </p>
              </div>
              <Input
                onChange={handleFileSelect}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          )}
        </>
      )}
    </div>
  );
}
