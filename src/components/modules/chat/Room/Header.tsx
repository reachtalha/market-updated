'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { db, auth } from '@/lib/firebase/client';
import { doc, getDocs, collection, writeBatch } from 'firebase/firestore';

import { useSWRConfig } from 'swr';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { toast } from 'react-hot-toast';

import { MoreVertical } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import Avatar from '@/components/common/Avatar';

type HeaderProps = {
  chatId: string;
  users: any;
};

const Header = ({ chatId, users }: HeaderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  console.log(users, 'users', auth.currentUser?.uid);
  const { name, photoURL } = users.filter((user: any) => user.uid !== auth.currentUser?.uid)[0];

  async function handleDelete() {
    try {
      setLoading(true);
      const batch = writeBatch(db);
      const messagesRef = collection(db, 'chat', `${chatId}`, 'messages');
      const messagesSnap = await getDocs(messagesRef);
      messagesSnap.forEach((doc) => {
        batch.delete(doc.ref);
      });
      const chatRef = doc(db, 'chat', `${chatId}`);
      batch.delete(chatRef);
      await batch.commit();
      mutate('user_chats');
      router.push('/chat');
    } catch (error) {
      toast.error('Oops! Something went wrong!');
    } finally {
      setLoading(false);
    }
  }
  return (
    <header className="relative flex w-full items-center space-x-3 border-b py-3 px-3 md:px-0">
      <button
        onClick={() => router.replace('/chat')}
        className="block md:hidden active:bg-gray-100 focus:bg-gray-100 rounded-full p-1"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <Avatar name={name} photoURL={photoURL} />
      <span className="capitalize">{name}</span>
      <Popover>
        <PopoverTrigger asChild>
          <button className="absolute right-2 top-5">
            <MoreVertical className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="rounded py-2 w-40 px-1 bg-white drop-shadow" sideOffset={5}>
          {' '}
          <button
            disabled={loading ? true : false}
            onClick={handleDelete}
            className="disabled:cursor-not-allowed text-left pl-2 duration-300 transition-colors w-full rounded-sm py-2 bg-red-100 text-red-500 hover:bg-red-200"
          >
            {loading ? 'Deleting' : ' Delete Chat'}
          </button>
        </PopoverContent>
      </Popover>
    </header>
  );
};

export default Header;
