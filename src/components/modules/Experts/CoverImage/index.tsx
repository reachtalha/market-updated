'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from '@/components/common/FallbackImage';

import { updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import { ImageIcon, ImagePlusIcon } from 'lucide-react';

import UploadImage from '@/utils/handlers/image/UploadImage';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

const SIZE = 5;

const ExpertCoverImage = ({ uid, coverImage }: { uid: string; coverImage: string }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState<boolean>(false);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.match(/\.(jpg|jpeg|png|webp)$/)) {
      toast.error('Please select a valid image');
      return;
    }
    if (file.size > SIZE * 1024 * 1024) {
      toast.error(`Please select an image smaller than ${SIZE}MB`);
      return;
    }
    setProcessing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const image = reader.result as string;
      const url = await UploadImage({
        collection: 'users',
        image: image as string,
        name: `cover-${auth.currentUser?.uid}`
      });
      await updateDoc(doc(db, 'users', `${auth.currentUser?.uid}`), {
        coverImage: url
      });
      setProcessing(false);
      toast.success('Your Cover image got updated');
      router.refresh();
    };
    reader.onerror = () => {
      setProcessing(false);
      toast.error('Error while reading the image');
    };
  };

  return (
    <div className="w-full group relative h-[500px] before:content-[''] before:absolute before:inset-0  before:bg-gradient-to-b before:from-black/30 before:via-black/20 before:z-10">
      {coverImage ? (
        <Image src={coverImage} className="h-full w-full object-cover" fill alt="expert-cover" />
      ) : (
        <div className="h-full w-full bg-neutral-700 grid place-content-center">
          <ImageIcon className="h-20 w-20 text-neutral-50 place-self-center" />
        </div>
      )}
      {auth.currentUser?.uid === uid && (
        <>
          {processing ? (
            <div className="absolute inset-0 bg-black/50  duration-300 transition-colors ease-in-out w-full h-full z-10">
              <Loader className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/50 hidden duration-300 transition-colors ease-in-out group-hover:block w-full h-full z-10">
              <label
                htmlFor="coverImage"
                className="absolute cursor-pointer inset-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <ImagePlusIcon className="h-8 w-8 text-neutral-50" />
              </label>
              <input
                type="file"
                id="coverImage"
                disabled={processing}
                hidden
                onChange={handleImageChange}
                className="disabled:cursor-not-allowed"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpertCoverImage;
