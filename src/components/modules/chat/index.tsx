import React from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import Header from '@/components/modules/chat/Room/Header';
import ChatBox from '@/components/modules/chat/Room/ChatBox';
import Input from '@/components/modules/chat/Room/Input';

import Error from '@/components/common/Error';
import { cookies } from 'next/headers';
import Redirect from './Redirect';

type Props = {
  chatId: string;
};

const getShopData = async (user: any) => {
  let name, photoURL;
  if (user.data().role === 'seller') {
    const shopsQuery = await getDocs(query(collection(db, 'shops'), where('uid', '==', user.id)));
    if (shopsQuery.docs.length > 0) {
      name = shopsQuery.docs[0].data().name;
      photoURL = shopsQuery.docs[0].data().coverImage;
    } else {
      name = user.data().name;
      photoURL = user.data().photoURL;
    }
  } else {
    name = user.data().name;
    photoURL = user.data().photoURL;
  }

  return { name, photoURL };
};

const getUsers = async (chatId: string) => {
  const chatDoc = await getDoc(doc(db, 'chat', `${chatId}`));
  if (!chatDoc.exists()) {
    return false;
  }
  const users = Object.keys(chatDoc.data().users);
  const usersData: any = [];

  const userDoc1 = await getDoc(doc(db, 'users', `${users[0]}`));
  const userDoc2 = await getDoc(doc(db, 'users', `${users[1]}`));

  if (userDoc1.exists() && userDoc2.exists()) {
    let { name, photoURL } = await getShopData(userDoc1);
    usersData.push({
      name,
      photoURL,
      chatId: chatDoc.id,
      uid: userDoc1.id
    });

    const { name: _name, photoURL: _photoURL } = await getShopData(userDoc2);
    usersData.push({
      name: _name,
      photoURL: _photoURL,
      chatId: chatDoc.id,
      uid: userDoc2.id
    });
  }

  return usersData;
};
const ChatRoom = async ({ chatId }: Props) => {
  const users = await getUsers(chatId);
  const cookie = cookies().get('user');
  const currentUser = cookie ? (JSON.parse(cookie.value) as any) : { uid: '' };

  if (users[0]?.uid !== currentUser?.uid && users[1].uid !== currentUser?.uid) {
    return <Redirect />;
  }
  if (!users) {
    return <Redirect />;
  }

  return (
    <>
      <Header chatId={chatId} users={users} />
      <ChatBox chatId={chatId} users={users} />
      <Input chatId={chatId} />
    </>
  );
};

export default ChatRoom;
