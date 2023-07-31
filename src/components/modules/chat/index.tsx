'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import useSWR from 'swr';
import Header from '@/components/modules/chat/Room/Header';
import ChatBox from '@/components/modules/chat/Room/ChatBox';
import Input from '@/components/modules/chat/Room/Input';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

interface ChatData {
  chatId: string;
  uid: string;
  name: string;
  photoURL: string;
}

type Props = {
  chatId: string;
};

const ChatRoom = ({ chatId }: Props) => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR<ChatData | any>(`${chatId}-chatroom`, async () => {
    const chatDoc = await getDoc(doc(db, 'chat', `${chatId}`));
    if (!chatDoc.exists()) {
      //router.replace('/chat');
      return <Loader />;
    }
    const users = Object.keys(chatDoc.data().users);
    const otherUser = users[0] !== auth.currentUser?.uid ? users[0] : users[1];

    const userDoc = await getDoc(doc(db, 'users', `${otherUser}`));
    if (!userDoc.exists()) {
      router.replace('/404');
      return <Loader />;
    }
    return {
      chatId: chatDoc.id,
      uid: userDoc.id,
      name: userDoc.data()?.name,
      photoURL: userDoc.data()?.photoURL
    };
  });
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <Header chatId={data?.chatId} name={data?.name} photoURL={data?.photoURL} />
      <ChatBox chatId={data?.chatId} name={data?.name} photoURL={data?.photoURL} />
      <Input chatId={data?.chatId} />
    </>
  );
};

export default ChatRoom;
