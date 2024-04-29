'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { auth, db } from '@/lib/firebase/client';
import { getDocs, query, collection, where, limit, addDoc } from 'firebase/firestore';

import useLocale from '@/hooks/useLocale';

import Chats from '@/components/modules/chat/Chat';
import Loader from '@/components/common/Loader';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const lang = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const seller = searchParams.get('id');
  const returnUrl = searchParams.get('return_url') || '';
  const isOnlychat = pathname === '/chat';

  useEffect(() => {
    (async () => {
      if (!seller) {
        return;
      }
      try {
        const customer = auth.currentUser?.uid;
        let id = null;
        const docRef = await getDocs(
          query(
            collection(db, 'chat'),
            where(`users.${seller}`, '==', true),
            where(`users.${customer}`, '==', true),
            limit(1)
          )
        );
        id = docRef.docs[0]?.id;
        if (!id) {
          const docRef = await addDoc(collection(db, 'chat'), {
            users: {
              [seller as string]: true,
              [customer as string]: true
            }
          });
          id = docRef.id;
        }
        router.push(`/${lang}/chat/${id}?return_url=${returnUrl}`);
      } catch (error) {
        throw new Error();
      }
    })();
  }, []);

  if (!auth.currentUser) {
    router.replace('/auth/login');
    return <Loader className="h-screen flex items-center justify-center w-screen" />;
  }

  return (
    <section className="relative w-screen border grid h-screen  md:overflow-hidden place-content-center bg-gray-100">
      <div className="overflow-hidden w-screen h-screen  md:mx-auto md:flex gap-2 px-0 md:px-3 py-0 md:flex-row md:gap-5 md:py-10 ">
        <div
          className={`h-full 
          ${isOnlychat ? 'block' : 'hidden'}
          md:block
           md:w-1/4   rounded-none md:rounded-xl border bg-white p-3 drop-shadow-md  md:overflow-hidden`}
        >
          <Chats />
        </div>
        <section
          className={`relative 
          ${isOnlychat ? 'hidden' : 'flex'}
           md:w-3/4 pb-2 md:pb-0 md:flex  h-full  flex-col rounded-none md:rounded-xl border bg-white `}
        >
          {children}
        </section>
      </div>
    </section>
  );
};

export default ChatLayout;
