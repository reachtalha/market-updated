'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase/client';
import { updateDoc, doc } from 'firebase/firestore';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Pin, PlusIcon, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const convertToEmbedUrl = (url: string) => {
  const videoId = extractVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
};

const extractVideoId = (url: string) => {
  let regex: any = '';
  if (url.includes('youtu.be')) {
    regex =
      /(?:\?v=|\/embed\/|\/watch\?v=|youtu\.be\/|\/v\/|\/e\/|\/u\/\w+\/|embed\/|v=|^)([a-zA-Z0-9_-]{11})/;
  } else
    regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|u\/\w\/|embed\/|watch\?.+&v=|v\/|e\/|watch\?.+v=|u\/\w\/|v\/|e\/)([^#\&\?]*).*/;
  const match = url.match(regex);
  return match && match[1] ? match[1] : null;
};

const AddPinnedContentModal = ({ uid, pinnedLinks }: { uid: string; pinnedLinks: string[] }) => {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>(pinnedLinks || []);
  const [loading, setLoading] = useState<boolean>(false);
  if (uid !== auth.currentUser?.uid) {
    return;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    let newLink = form.link.value;
    if (newLink.trim().length === 0) {
      toast.error('Link cannot be empty.');
      return;
    }
    if (links.length > 2) {
      toast.error('Oops! You can only pin up to three content links.');
      return;
    }

    if (newLink.includes('instagram') && !newLink.includes('embed')) {
      newLink = newLink.split('?')[0] + 'embed/';
    } else if (
      (newLink.includes('youtube') || newLink.includes('youtu')) &&
      !newLink.includes('embed')
    ) {
      newLink = convertToEmbedUrl(newLink);
    } else if (
      (newLink.includes('facebook') || newLink.includes('fb')) &&
      !newLink.includes('https://www.facebook.com/plugins')
    ) {
      newLink = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
        newLink
      )}&width=500`;
    } else if (newLink.includes('tiktok') && !newLink.includes('embed')) {
      const regex = /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/;
      const match = newLink.match(regex);
      newLink = `https://www.tiktok.com/embed/v2/${match[3]}?lang=en&height=300`;
    } else if (newLink.includes('twitter') && !newLink.includes('embed')) {
      newLink = `https://twitframe.com/show?url=${newLink}`;
    }
    setLinks((prev) => [...prev, newLink]);
    form.reset();
  };

  const handleRemove = (index: number) => {
    const updatedLinks = links.filter((_, idx) => idx !== index);
    setLinks(updatedLinks);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', `${auth.currentUser?.uid}`), {
        pinned: links
      });
      toast.success('Your pinned links have been saved successfully.');
      router.refresh();
    } catch (e: any) {
      toast.error(
        'Oops! Something went wrong while saving your pinned links. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          title="Manage Pinned Content"
          className="rounded-full z-20  absolute w-fit h-fit trans p-1.5 top-14 md:top-36 lg:top-40 right-0"
        >
          <Pin className="text-neutral-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Organize Pinned Content</DialogTitle>
          <DialogDescription>
            Organize and manage your pinned items in one convenient place. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex  gap-x-2 items-center">
          <Input name="link" type="text" placeholder="Paste the Link of the Post" />
          <Button variant="default" className="w-fit h-fit p-2">
            <PlusIcon />
          </Button>
        </form>
        <h6>Pinned Content Links:</h6>
        {links.length === 0 && (
          <p className="text-center text-sm">Your pinned content list is currently empty</p>
        )}
        <ul>
          {links.map((l: string, idx: number) => (
            <li key={Math.random()} className="flex w-full items-center gap-x-2 justify-between">
              <p className="truncate w-72">{l}</p>
              <Button
                variant="ghost"
                onClick={() => handleRemove(idx)}
                className="w-fit h-fit rounded-full p-1"
              >
                <TrashIcon className="text-red-500 h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button onClick={handleSave} disabled={loading} variant="default">
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPinnedContentModal;
