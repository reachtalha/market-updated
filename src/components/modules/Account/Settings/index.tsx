'use client';
import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
  Timestamp,
  increment,
  updateDoc,
  addDoc,
  setDoc
} from 'firebase/firestore';
import { db, auth, storage } from '@/lib/firebase/client';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import toast from 'react-hot-toast';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import EditAccount from './EditAccount';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const AddShop = ({ defaultValues }: { defaultValues: FormValues }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);

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
      console.log(data);

      if (!isPasswordReset) {
        await updateDoc(doc(db, 'users', auth.currentUser?.uid as string), {
          name: data?.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
        toast.success('Account Updated Successfully');
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
          <EditAccount isPasswordReset={isPasswordReset} setIsPasswordReset={setIsPasswordReset} />
        </form>
      </FormProvider>
    </section>
  );
};

export default AddShop;
