'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

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
  return [
    {
      chatId: '1',
      users: {
        biUw205JxwMXZBP1nSZ8NQvYpJy2: true,
        LCasJuiJAjesaeNmrFB1WasAGME3: true
      }
    }
  ];
};

export const getUser = async (userId: string): Promise<DocumentData | undefined> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return {
      name: userDoc.data().name,
      photoURL: userDoc.data().photoURL ?? ''
    };
  }
};

export default function Chat() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const {
    data: chats,
    error,
    isLoading
  }: SWRResponse<Chat[], Error> = useSWR('user_chats', fetchChats);
  if (isLoading) {
    return <Loader />;
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
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => router.push('/')}
          className="block md:hidden p-1 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </Button>
        <div className="px-3 flex gap-x-1 items-center w-full rounded-full border-[2px] focus-within:border-primary overflow-hidden">
          <Input
            type="search"
            inputMode="search"
            placeholder="Search User"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none placeholder:text-sm text-gray-600"
          />
          <Search className="w-5 h-5 text-gray-400" color="currentColor" strokeWidth={2} />
        </div>
      </div>
      <h6 className="text-gray-500 text-sm mt-4 mb-3">Your Chats</h6>
      {filteredChats?.length === 0 && (
        <div className="grid place-content-center">
          <NoSearchResult className="w-28 h-28 place-self-center" />
          <h4 className="text-gray-800 font-semibold place-self-center">No Results</h4>
          <p className="text-center text-gray-500">
            Sorry, there are no results for this search. Please try another name
          </p>
        </div>
      )}
      <ul className="divide-y">
        {filteredChats?.map((chat) => {
          return (
            <li
              key={chat.chatId}
              onClick={() => router.replace(`/chat/${chat.chatId}`)}
              className="flex cursor-pointer items-center space-x-2 rounded-md px-1 py-2 transition delay-75 duration-300 ease-in-out hover:bg-gray-100 focus:outline-none"
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
