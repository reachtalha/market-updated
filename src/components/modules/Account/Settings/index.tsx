'use client';
import React, { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import toast from 'react-hot-toast';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import EditAccount from './EditAccount';
import useAuth from '@/hooks/useAuth';
import UploadImage from '@/utils/handlers/image/UploadImage';
import DeleteImage from '@/utils/handlers/image/DeleteImage';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  photoURL: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Index = ({ defaultValues }: { defaultValues: FormValues }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState<boolean>(false);
  const { updatePassword, updateCurrentUser } = useAuth();

  const methods = useForm<FormValues>({
    defaultValues,
    shouldUnregister: false
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      if (!isPasswordUpdate) {
        let photoURL;
        if (!data.photoURL.includes('firebasestorage.googleapis.com')) {
          photoURL = await UploadImage({
            collection: 'products',
            image: data.photoURL,
            name: 'profile' + new Date().getTime()
          });
          if (defaultValues.photoURL) await DeleteImage({ imageUrl: defaultValues.photoURL });
        }

        await updateDoc(doc(db, 'users', auth.currentUser?.uid as string), {
          name: data?.name?.toLowerCase(),
          email: data.email,
          phone: data.phone,
          address: data.address,
          photoURL: photoURL ?? data.photoURL
        });
        try {
          await updateCurrentUser(data?.name, data?.email);
          toast.success('Account Updated Successfully');
          reset();
          window.location.reload();
        } catch (error) {
          toast.error('Error while updating account');
        }
      } else {
        if (data.confirmPassword !== data.newPassword) {
          toast.error("Password doesn't match");
          return;
        }
        try {
          await updatePassword(data.currentPassword, data.newPassword);
          toast.success('Password Updated Successfully');
          reset();
          window.location.reload();
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    } catch (e) {
      toast.error('Error while updating account');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={` py-10`}>
      <FormProvider {...methods}>
        <form id="edit-account-form" onSubmit={handleSubmit(onSubmit)} className="">
          <EditAccount
            isPasswordUpdate={isPasswordUpdate}
            setIsPasswordUpdate={setIsPasswordUpdate}
            loading={loading}
          />
        </form>
      </FormProvider>
    </section>
  );
};

export default Index;
