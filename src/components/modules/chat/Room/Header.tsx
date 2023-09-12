'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { db, auth } from '@/lib/firebase/client';
import {
  doc,
  getDocs,
  collection,
  writeBatch,
  query,
  where,
  updateDoc,
  getDoc
} from 'firebase/firestore';

import Image from '@/components/common/FallbackImage';
import useSwr, { useSWRConfig } from 'swr';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { toast } from 'react-hot-toast';

import { MoreVertical, Info, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import Loader from '@/components/common/Loader';

type HeaderProps = {
  chatId: string;
  users: any;
};

const getImages = async (chatId: string) => {
  const q = query(collection(db, 'chat', chatId, 'messages'), where('type', '==', 'image'));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return [];
  const images = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return images || [];
};

const Header = ({ chatId, users }: HeaderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { name, photoURL } = users.filter((user: any) => user.uid !== auth.currentUser?.uid)[0];
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useSwr('user_chat_images', () => getImages(chatId)) as any;

  async function handleDelete() {
    try {
      setLoading(true);
      // const batch = writeBatch(db);
      // const messagesRef = collection(db, 'chat', `${chatId}`, 'messages');
      // const messagesSnap = await getDocs(messagesRef);
      // messagesSnap.forEach((doc) => {
      //   batch.delete(doc.ref);
      // });
      // const chatRef = doc(db, 'chat', `${chatId}`);
      // batch.delete(chatRef);
      // await batch.commit();
      const chat = await getDoc(doc(db, 'chat', `${chatId}`));

      if (chat.data()?.deletedBy) {
        await updateDoc(doc(db, 'chat', `${chatId}`), {
          deletedBy: [...chat.data()?.deletedBy, auth.currentUser?.uid]
        });
      } else {
        await updateDoc(doc(db, 'chat', `${chatId}`), {
          deletedBy: [auth.currentUser?.uid]
        });
      }

      mutate('user_chats');
      window.location.replace('/chat');
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something went wrong!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="relative flex w-full items-center space-x-3 border-b py-2.5 px-3 md:px-0">
      <button
        onClick={() => router.push('/chat')}
        className="block md:hidden active:bg-gray-100 focus:bg-gray-100 rounded-full p-1"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <Avatar name={name} photoURL={photoURL} />
      <span className="capitalize">{name}</span>
      <button className="absolute right-8 top-5">
        <Info
          className="h-6 w-6 text-gray-500"
          onClick={() => {
            setShowInfo(true);
            mutate('user_chat_images');
          }}
          strokeWidth={1.5}
        />
      </button>

      <div
        className={` absolute right-[0] top-0 rounded-lg z-50 bg-white transition-transform duration-500 border min-h-[89vh] w-screen md:w-[45vw] lg:w-[25vw] ${
          showInfo ? 'translate-x-[0]' : 'translate-x-[120%]'
        }`}
      >
        <X
          onClick={() => setShowInfo(false)}
          className="h-6 w-6 ms-auto mt-2 me-2 text-gray-500 cursor-pointer "
          strokeWidth={1.5}
        />
        <div className="h-full">
          <div className="flex flex-col items-center gap-y-3 justify-center mt-5">
            <div className="h-32 w-32 rounded-full relative">
              <Image
                src={photoURL}
                alt="user"
                fill
                className="h-full rounded-full w-full object-cover"
              />
            </div>
            <span className="capitalize text-lg">{name}</span>
          </div>
          <div>
            <div></div>
            <span className="text-xl ms-5 mt-5 font-medium">Media</span>
            {isLoading ? (
              <Loader />
            ) : data?.length > 0 ? (
              <div className="flex flex-wrap items-center  justify-start gap-x-2 gap-y-2 p-4 mt-4 max-h-[50vh] overflow-y-scroll ">
                {data.map((image: any, index: number) => (
                  <div key={index} className="relative w-[9.6rem] h-[9.6rem]">
                    <Image
                      src={image.message}
                      alt="image"
                      fill
                      className="h-32 w-full rounded-md object-cover border"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-center flex items-center justify-center w-full h-60 text-gray-500">
                No Media
              </span>
            )}
          </div>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button className="absolute right-2 top-5">
            <MoreVertical className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="rounded py-2 w-40 px-1 bg-white drop-shadow" sideOffset={5}>
          <button
            disabled={loading ? true : false}
            onClick={handleDelete}
            className="disabled:cursor-not-allowed text-left pl-2 duration-300 transition-colors w-full rounded py-2 bg-red-100 text-red-500 hover:bg-red-200"
          >
            {loading ? 'Deleting' : ' Delete Chat'}
          </button>
        </PopoverContent>
      </Popover>
    </header>
  );
};

export default Header;
