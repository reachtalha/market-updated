import React from 'react';

import Index from '@/components/modules/chat/index';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatRoom = ({ params }: Props) => {
  const { chatId } = params;

  if (!chatId) {
    return notFound();
  }

  return <Index chatId={chatId} />;
};

export default ChatRoom;
