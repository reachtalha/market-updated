'use client';
import { useState } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { collection, query, doc, where, getDocs, getDoc, DocumentData } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import Avatar from '@/components/common/Avatar';

import { Search } from 'lucide-react';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useSWR, { SWRResponse } from 'swr';
import NoSearchResult from '@/assets/Illustrations/NoSearchResult';
import { ArrowLeft } from 'lucide-react';

interface Chat {
  chatId: string;
  userId: string;
  name: string;
  photoURL: string;
}

interface User {
  name: string;
  photoURL: string;
}

const fetchChats = async (): Promise<Chat[]> => {
  const chats: Chat[] = [];
  const chatsId = await getChats();
  for (const chatId of chatsId) {
    const { users } = chatId;
    const otherUser = Object.keys(users).filter((id) => id !== auth.currentUser?.uid);
    const user = (await getUser(otherUser[0])) as User;
    chats.push({
      ...user,
      chatId: chatId.chatId,
      userId: String(otherUser)
    });
  }
  return chats;
};

const getChats = async (): Promise<{ chatId: string; users: Record<string, boolean> }[]> => {
  const chats: { chatId: string; users: Record<string, boolean> }[] = [];
  const ref = collection(db, 'chat');
  const q = query(ref, where(`users.${auth.currentUser?.uid}`, '==', true));
  const docSnap = await getDocs(q);
  docSnap.forEach((doc) => {
    chats.push({ chatId: doc.id, users: doc.data().users });
  });
  return chats;
};

export const getUser = async (userId: string): Promise<DocumentData | undefined> => {
  const userDoc = await getDoc(doc(db, 'users', userId));

  if (userDoc.exists()) {
    const shopDoc = await getDocs(query(collection(db, 'shops'), where('uid', '==', userId)));
    let name, photoURL;

    if (shopDoc.docs.length > 0) {
      name = shopDoc.docs[0].data().name;
      photoURL = shopDoc.docs[0].data().coverImage;
    } else {
      name = userDoc.data().name;
      photoURL = userDoc.data().photoURL;
    }
    return {
      name,
      photoURL
    };
  }
};

export default function Chat() {
  const {
    data: chats,
    error,
    isLoading
  }: SWRResponse<Chat[], Error> = useSWR('user_chats', fetchChats);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('return_url') || '';

  if (isLoading) {
    return <Loader className="w-full h-full flex items-center justify-center" />;
  }
  if (error) {
    return <Error />;
  }
  if (chats?.length === 0) {
    return <p className="py-10 text-center">No Chat found</p>;
  }

  const filteredChats = chats?.filter((e) => e.name.includes(search?.toLocaleLowerCase()));

  return (
    <section className="selection:h-full overflow-y-auto">
      <div className="flex relative h-14  items-center justify-center  mb-3">
        <Button
          onClick={() => {
            router.push(`/${returnUrl}`);
          }}
          className=" block left-0 top-[50%] translate-y-[-50%] absolute   rounded-full border bg-white p-2 hover:bg-gray-100"
        >
          <ArrowLeft color={'#000000'} className="h-6 w-6" strokeWidth={1.5} />
        </Button>
        <div className="px-3 me-5 flex gap-x-1 items-center  focus-within:border-primary overflow-hidden">
          All Organics
        </div>
      </div>
      <div className="flex  items-center gap-x-2">
        <div className="px-3 flex gap-x-1 items-center w-full rounded-full border-[2px] focus-within:border-primary overflow-hidden">
          <Input
            type="search"
            inputMode="search"
            placeholder="Search User"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none placeholder:text-sm text-neutral-600"
          />
          <Search className="w-5 h-5 text-neutral-400" color="currentColor" strokeWidth={2} />
        </div>
      </div>
      <h6 className="text-neutral-500 text-sm mt-4 mb-3">Your Chats</h6>
      {filteredChats?.length === 0 && (
        <div className="grid place-content-center">
          <NoSearchResult className="w-28 h-28 place-self-center" />
          <h4 className="text-neutral-800 font-semibold place-self-center">No Results</h4>
          <p className="text-center text-gray-500">
            Sorry, there are no results for this search. Please try another name
          </p>
        </div>
      )}
      <ul className="divide-y">
        {filteredChats?.map((chat) => {
          const path = `/chat/${chat.chatId}?return_url=${returnUrl}`;
          return (
            <li
              key={chat.chatId}
              onClick={() => router.replace(path)}
              className={`flex cursor-pointer items-center space-x-2 rounded-md px-1 py-2 transition delay-75 duration-300 ease-in-out hover:bg-neutral-100 focus:outline-none ${
                pathname === path ? 'bg-neutral-100' : 'bg-none'
              }`}
            >
              <Avatar name={chat.name} photoURL={chat.photoURL} />
              <span className="capitalize">{chat.name ? chat.name : ''}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
