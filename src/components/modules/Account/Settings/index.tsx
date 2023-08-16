'use client';
import React, { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import toast from 'react-hot-toast';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import EditAccount from './EditAccount';
import useAuth from '@/hooks/useAuth';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Index = ({ defaultValues }: { defaultValues: FormValues }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState<boolean>(false);
  const { updatePassword } = useAuth();

  const methods = useForm<FormValues>({
    defaultValues,

    shouldUnregister: false
  });
  const { handleSubmit, reset } = methods;

  function normalize(text: string) {
    return text.replace(/[\u2018\u2019\u201C\u201D]/g, "'");
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!isPasswordUpdate) {
        await updateDoc(doc(db, 'users', auth.currentUser?.uid as string), {
          name: data?.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
        toast.success('Account Updated Successfully');
      } else {
        if (data.confirmPassword !== data.newPassword) {
          toast.error("Password doesn't match");
          return;
        }
        updatePassword(data.currentPassword, data.newPassword);

        toast.success('Password Updated Successfully');
      }
      reset();
      window.location.reload();
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
          />
        </form>
      </FormProvider>
    </section>
  );
};

export default Index;
