import React from 'react';
import Error from '@/components/common/Error';

import Index from '@/components/modules/chat/index';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatRoom = ({ params }: Props) => {
  const { chatId } = params;

  if (!chatId) {
    return <Error />;
  }

  return <Index chatId={chatId} />;
};

export default ChatRoom;
