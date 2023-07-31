'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import Loader from '@/components/common/Loader';

import Index from '@/components/modules/chat/index';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatRoom = ({ params }: Props) => {
  const { chatId } = params;
  const router = useRouter();
  if (!chatId) {
    router.replace('/404');
    return <Loader />;
  }

  return <Index chatId={chatId} />;
};

export default ChatRoom;
