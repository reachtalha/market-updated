'use client';

import React from 'react';
import { redirect, useSearchParams, useRouter } from 'next/navigation';

import { auth, db } from '@/lib/firebase/client';
import { getDocs, query, collection, where, limit, addDoc } from 'firebase/firestore';
import useSwr from 'swr';

import Chats from '@/components/modules/chat/Chat';
import { ArrowLeft } from 'lucide-react';
import Loader from '@/components/common/Loader';

const getChat = async (seller: string, router: any, returnUrl: string) => {
  try {
    const customer = auth.currentUser?.uid;
    const chatId =
      (
        await getDocs(
          query(
            collection(db, 'chat'),
            where(`users.${seller}`, '==', true),
            where(`users.${customer}`, '==', true),
            limit(1)
          )
        )
      ).docs[0]?.id ??
      (
        await addDoc(collection(db, 'chat'), {
          users: {
            [seller as string]: true,
            [customer as string]: true
          }
        })
      ).id;
    router.push(`/chat/${chatId}?return_url=${returnUrl}`);
  } catch (error) {
    console.log(error);
  }
};

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seller = searchParams.get('id');
  const returnUrl = searchParams.get('return_url') || '';
  let loading = false;

  if (!auth.currentUser) {
    redirect('/auth/login');
  }

  if (seller) {
    loading = true;
    getChat(seller, router, returnUrl);
  }

  if (loading) return <Loader className="h-screen flex items-center justify-center w-screen" />;
  return (
    <section className="relative w-screen border grid h-screen  md:overflow-hidden place-content-center bg-gray-100">
      <div className="overflow-hidden w-screen h-screen  md:mx-auto md:flex gap-2 px-0 md:px-3 py-0 md:flex-row md:gap-5 md:py-10 ">
        <div
          className={`  h-full w-full md:w-1/4   rounded-none md:rounded-xl border bg-white p-3 drop-shadow-md  md:overflow-hidden`}
        >
          <Chats />
        </div>
        <section
          className={`relative w-full md:w-3/4 pb-2 md:pb-0 flex  h-full  flex-col rounded-none md:rounded-xl border bg-white `}
        >
          {children}
        </section>
      </div>
    </section>
  );
};

export default ChatLayout;
