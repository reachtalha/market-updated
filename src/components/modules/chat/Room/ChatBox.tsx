import { useState } from 'react';

import Image from 'next/image';

import { db, auth } from '@/lib//firebase/client';
import { doc, deleteDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import useSWR from 'swr';

import { toast } from 'react-hot-toast';

import Avvvatars from 'avvvatars-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { MoreVertical } from 'lucide-react';
import { X } from 'lucide-react';
import NoChat from '@/assets/Illustrations/NoChat';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

type ChatBoxProps = {
  chatId: string;
  photoURL: string;
  name: string;
};
const ChatBox = ({ chatId, photoURL, name }: ChatBoxProps) => {
  const {
    data: messages,
    error,
    isLoading
  } = useSWR(`${chatId}-messages`, async () => {
    const q = query(
      collection(db, 'chat', `${chatId}`, 'messages'),
      orderBy('sentAt', 'desc'),
      limit(10)
    );
    const list: any = [];
    const docRef = await getDocs(q);
    docRef.forEach((m) => {
      list.push({ id: m.id, ...m.data() });
    });
    return list;
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }
  return (
    <>
      {messages?.length === 0 && (
        <div className="grid place-content-center my-[10%]">
          <NoChat className="w-40 h-40 place-self-center" />
          <h4 className="place-self-center text-gray-800 font-semibold">No Messages Found</h4>
          <p className="w-1/2 place-self-center text-center text-gray-500">
            No messages in your inbox, yet! Start chatting with{' '}
            <span className="capitalize font-semibold first-letter:uppercase">{name}</span>
          </p>
        </div>
      )}
      <ul className="no-scrollbar relative flex h-full space-y-1 w-full flex-col-reverse overflow-y-auto px-3 pt-3">
        {messages?.map((msg: any) => {
          return (
            <ChatMessage
              key={msg.id}
              chatId={chatId}
              messageId={msg.id}
              messageObj={msg}
              photoURL={photoURL}
              name={name}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ChatBox;

type ChatMessageProps = {
  chatId: string;
  messageId: string;
  messageObj: any;
  photoURL: string;
  name: string;
};

function ChatMessage({ chatId, messageId, messageObj, photoURL, name }: ChatMessageProps) {
  const { message, sentBy, sentAt, type } = messageObj;
  const messageClass = sentBy === auth.currentUser?.uid ? 'sent' : 'received';

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

type DeleteMessageProps = {
  chatId: string;
  messageId: string;
  type: string;
  message: string;
};

function DeleteMessage({ chatId, messageId, type, message }: DeleteMessageProps) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'chat', `${chatId}`, 'messages', `${messageId}`));
      if (type !== 'text') {
        //deleteObject(ref(storage, getPathStorageFromUrl(message)));
      }
    } catch (error) {
      toast.error('There was an error while deleting the message. Please try again later.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="absolute z-10 right-1 top-3">
          <MoreVertical className="h-4 w-4 text-gray-300" strokeWidth={1.5} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="rounded py-2 w-36 px-1   bg-white drop-shadow">
        <button
          disabled={loading ? true : false}
          onClick={handleDelete}
          className="disbaled:cursor-not-allowed  w-full text-sm text-left pl-2 rounded-sm py-2 bg-red-100 hover:bg-red-200 text-red-500"
        >
          {loading ? 'Deleting' : 'Delete Message'}
        </button>
      </PopoverContent>
    </Popover>
  );
}
