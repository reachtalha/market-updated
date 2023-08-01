import React from 'react';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import Header from '@/components/modules/chat/Room/Header';
import ChatBox from '@/components/modules/chat/Room/ChatBox';
import Input from '@/components/modules/chat/Room/Input';

import Error from '@/components/common/Error';

type Props = {
  chatId: string;
};

const getUsers = async (chatId: string) => {
  const chatDoc = await getDoc(doc(db, 'chat', `${chatId}`));
  if (!chatDoc.exists()) {
    return <Error />;
  }
  const users = Object.keys(chatDoc.data().users);
  const usersData: any = [];

  const userDoc1 = await getDoc(doc(db, 'users', `${users[0]}`));
  const userDoc2 = await getDoc(doc(db, 'users', `${users[1]}`));

  usersData.push({
    chatId: chatDoc.id,
    uid: userDoc1.id,
    name: userDoc1.data()?.name,
    photoURL: userDoc1.data()?.photoURL
  });
  usersData.push({
    chatId: chatDoc.id,
    uid: userDoc2.id,
    name: userDoc2.data()?.name,
    photoURL: userDoc2.data()?.photoURL
  });

  return usersData;
};
const ChatRoom = async ({ chatId }: Props) => {
  const users = await getUsers(chatId);

  return (
    <>
      <Header chatId={chatId} users={users} />
      <ChatBox chatId={chatId} users={users} />
      <Input chatId={chatId} />
    </>
  );
};

export default ChatRoom;
