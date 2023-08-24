"use client"
import { CrossIcon, UploadIcon, XIcon } from 'lucide-react';
import { handleImage } from '@/components/common/functions';
import UploadImage from '@/utils/handlers/image/UploadImage';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

type UploadImageProps = {
  onUploadSuccess: any
}
export default function UploadImageView({ onUploadSuccess }: UploadImageProps){
  const [url, setURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const handleUploadImage = async (base64Image: string) => {
    try {
      setIsLoading(true);
      const resp = await UploadImage({
        collection: 'blogs',
        image: base64Image,
        name: 'blog-' + new Date().getTime()
      })

      setURL(resp);
    }catch(err){
      console.log(err);
    }finally {
      setIsLoading(false);
    }
  }
  const handleFileSelect = (e: any) => {
    handleImage(e.target.files[0], handleUploadImage);
  }

  return (
    <div className="flex items-center justify-center w-full">
      {isLoading ? <Skeleton className="h-[220px] w-full bg-gray-200" /> : (
        <>
          {url !== "" ? <div className="relative border w-full">
            <button className="absolute -top-3 -right-3 m-0 p-1 rounded-full shadow-lg border bg-white">
              <XIcon height={16} width={16} />
            </button>
              <Image alt={url} src={url} height={300} width={300} className="w-full h-[220px] object-cover rounded-lg" />
          </div>
          :<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="mb-3" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                className="font-semibold">Click to upload</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Supported files are jpg, jpeg, png, webp</p>
            </div>
            <input onChange={handleFileSelect} id="dropzone-file" type="file" className="hidden" />
          </label>}
        </>
      )}
    </div>
  )
}