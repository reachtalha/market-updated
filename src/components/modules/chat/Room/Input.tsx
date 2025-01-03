'use client';
import React, { useRef } from 'react';

import { db, auth, storage } from '@/lib/firebase/client';
import { doc, addDoc, Timestamp, collection, getDoc, updateDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
  UploadTask
} from 'firebase/storage';

import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { ImagePlus, Send } from 'lucide-react';

const InputBox = ({ chatId }: { chatId: string }) => {
  const imageRef = useRef(null);

  const addMessage = async (message: string, type: string) => {
    try {
      const chat = await getDoc(doc(db, 'chat', `${chatId}`));

      if (chat.data()?.deletedBy && chat.data()?.deletedBy.length > 0) {
        await updateDoc(doc(db, 'chat', `${chatId}`), {
          deletedBy: []
        });
      }
      await addDoc(collection(db, 'chat', `${chatId}`, 'messages'), {
        message: message,
        photoURL: auth.currentUser?.photoURL ?? '',
        sentAt: Timestamp.fromDate(new Date()),
        sentBy: auth.currentUser?.uid,
        type: type
      });
    } catch (error) {
      toast.error('Oops! Something went wrong!');
    }
  };

  const sendTextMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());
    const textMessage = String(formData.textMessage).trim();
    if (!textMessage) {
      toast.error('Please write a message');
      return;
    }
    addMessage(textMessage, 'text');
    (e.target as HTMLFormElement).reset();
  };

  const sendImageMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = e.target;
    if (fileInput?.files && fileInput.files.length > 0) {
      const image = fileInput.files[0];
      const fileType = image.type.split('/')[1];
      const storageRef = ref(storage, `image-${Date.now()}.${fileType}`);
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error: Error) => {
          toast.error('Error while uploading image!');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
            addMessage(downloadURL, 'image');
          });
        }
      );
    }
  };
  return (
    <form onSubmit={sendTextMessage}>
      <div className="flex w-full items-center justify-between border-t border-neutral-300 px-1 py-3 md:p-3">
        <Input
          name="textMessage"
          type="text"
          inputMode="text"
          pattern="^\s*\S.*$"
          autoComplete="off"
          placeholder="Type message here..."
          className="mx-1.5 block w-full rounded-full border bg-neutral-100 py-2 pl-4 outline-none drop-shadow-sm focus:text-neutral-700 md:mx-3"
          required
          onInvalid={(e: any) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Input doesn't just contain whitespaces!"
            )
          }
          onInput={(e: any) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <div className="mr-2">
          <Label htmlFor="file-input">
            <ImagePlus
              className="h-6 w-6 cursor-pointer text-primary/90 hover:text-primary"
              strokeWidth={1.5}
            />
          </Label>

          <input
            id="file-input"
            ref={imageRef}
            accept="image/*"
            className="hidden"
            type="file"
            onChange={sendImageMessage}
          />
        </div>
        <Button type="submit" variant="default" className="rounded-full px-2.5 py-1.5">
          <Send className="h-5 w-5 text-white" strokeWidth={1.5} />
        </Button>
      </div>
    </form>
  );
};

export default InputBox;
