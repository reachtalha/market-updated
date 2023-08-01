'use client';
import { db } from '@/lib/firebase/client';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import NoChat from '@/assets/Illustrations/NoChat';

type ChatBoxProps = {
  chatId: string;
  users: any;
};

const ChatBox = ({ chatId, users }: ChatBoxProps) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Create the query for the 'messages' collection
    const q = query(collection(db, 'chat', chatId, 'messages'));

    // Set up the real-time listener with onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      let newMessages: any = [];

      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });

      setMessages(newMessages.sort((a: any, b: any) => b.sentAt - a.sentAt));
    });

    // Clean up the real-time listener when the component unmounts
    return () => unsubscribe();
  }, [chatId]);

  return (
    <>
      {messages.length === 0 && (
        <div className="grid place-content-center my-[10%]">
          <NoChat className="w-40 h-40 place-self-center" />
          <h4 className="place-self-center text-gray-800 font-semibold">No Messages Found</h4>
          <p className="w-1/2 place-self-center text-center text-gray-500">
            No messages in your inbox, yet!
          </p>
        </div>
      )}
      <ul className="no-scrollbar relative flex h-full space-y-1 w-full flex-col-reverse overflow-y-auto px-3 pt-3">
        {messages.map((msg: any) => {
          return (
            <ChatMessage
              key={msg.id}
              chatId={chatId}
              messageId={msg.id}
              messageObj={msg}
              users={users}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ChatBox;
