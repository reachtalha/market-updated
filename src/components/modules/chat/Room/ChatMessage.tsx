'use client';
import Avvvatars from 'avvvatars-react';
import Image from 'next/image';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { auth } from '@/lib/firebase/client';
import DeleteMessage from './DeleteMessage';

import React from 'react';

type ChatMessageProps = {
  chatId: string;
  messageId: string;
  messageObj: any;
  users: any;
};
type ChatData = {
  chatId: string;
  uid: string;
  name: string;
  photoURL: string;
};

function ChatMessage({ chatId, messageId, messageObj, users }: ChatMessageProps) {
  const { message, sentBy, sentAt, type } = messageObj;
  const messageClass = sentBy === auth.currentUser?.uid ? 'sent' : 'received';
  const { name, photoURL } = users.filter((user: ChatData) => user.uid === sentBy)[0];

  return (
    <>
      {messageClass === 'sent' ? (
        <li className="group flex justify-end mb-2">
          <div className="relative rounded-t-3xl rounded-br-3xl">
            <DeleteMessage chatId={chatId} messageId={messageId} type={type} message={message} />
            {type === 'text' ? (
              <p className="max-w-[350px] mb-1 break-all rounded-t-3xl rounded-bl-3xl bg-blue-500/90 py-2 pl-3 pr-5 text-white shadow 2xl:text-lg">
                {message}
              </p>
            ) : (
              <ImageDialog message={message} />
            )}
            <p className="text-right text-xs text-gray-500">
              {new Date(sentAt.seconds * 1000).toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
          </div>
        </li>
      ) : (
        <li className="flex justify-start space-x-2 mb-2">
          {photoURL ? (
            <Image
              src={photoURL}
              width={80}
              height={80}
              className="w-8 h-8 object-cover rounded-full"
              alt=""
            />
          ) : (
            <Avvvatars size={40} value={name.toUpperCase()[0]} />
          )}
          <div>
            {type === 'text' ? (
              <p className="max-w-[350px] mb-1 break-all rounded-t-3xl rounded-br-3xl bg-slate-100 px-4 py-2 text-gray-700  shadow 2xl:text-lg">
                {message}
              </p>
            ) : (
              <ImageDialog message={message} />
            )}
            <p className="text-left text-xs text-gray-500">
              {new Date(sentAt.seconds * 1000).toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
          </div>
        </li>
      )}
    </>
  );
}

function ImageDialog({ message }: { message: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        {' '}
        <button className="relative h-32 w-32 overflow-hidden border rounded-xl md:h-40 md:w-40">
          <Image
            src={message}
            height={250}
            width={250}
            alt=""
            className="object-cover bg-gray-100"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="DialogContent w-full md:w-fit h-fit DialogOverlay">
        <Image src={message} height={400} width={400} className="object-contain" alt="" />
      </DialogContent>
    </Dialog>
  );
}

export default ChatMessage;
