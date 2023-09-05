'use client';
import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib//firebase/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { MoreVertical } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { deleteImage } from '@/components/common/functions';
import DeleteImage from '@/utils/handlers/image/DeleteImage';

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
      await updateDoc(doc(db, 'chat', `${chatId}`, 'messages', `${messageId}`), {
        message: 'Message deleted',
        type: 'deleted'
      });
      if (type !== 'text') {
        await DeleteImage({ imageUrl: message });
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

export default DeleteMessage;
