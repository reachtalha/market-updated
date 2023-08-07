"use client";

import React, { useState } from 'react'
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
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';

import { Pin, PlusIcon, TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast';


const AddPinnedContentModal = ({ uid, pinnedLinks }: { uid: string, pinnedLinks: string[] }) => {
    const router = useRouter();
    const [links, setLinks] = useState<string[]>(pinnedLinks || []);
    const [loading, setLoading] = useState<boolean>(false);
    if (uid !== auth.currentUser?.uid) {
        return;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (links.length > 2) {
            toast.error("Oops! You can only pin up to three content links.");
            return;
        }
        const form = event.target as HTMLFormElement;
        const newLink = form.link.value;
        setLinks((prev) => [...prev, newLink])
        form.reset();
    }

    const handleRemove = (index: number) => {
        const updatedLinks = links.filter((_, idx) => idx !== index);
        setLinks(updatedLinks);
    };


    const handleSave = async () => {
        try {
            setLoading(true);
            await updateDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
                pinned: links
            })
            toast.success("Your pinned links have been saved successfully.");
            router.refresh();
        } catch (e: any) {
            toast.error("Oops! Something went wrong while saving your pinned links. Please try again later.");

        } finally {
            setLoading(false);
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" title="Manage Pinned Content" className='rounded-full absolute w-fit h-fit p-1.5 top-0 right-0'><Pin className='text-neutral-600' /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Organize Pinned Content</DialogTitle>
                    <DialogDescription>
                        Organize and manage your pinned items in one convenient place. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex gap-x-2 items-center">
                    <Input name='link' type="text" placeholder="Add embedded link" />
                    <Button variant="default" className='w-fit h-fit p-2'><PlusIcon /></Button>
                </form>
                <h6>Pinned Content Links:</h6>
                {links.length === 0 && <p className='text-center text-sm'>Your pinned content list is currently empty</p>}
                <ul>
                    {links.map((l: string, idx: number) => <li key={Math.random()} className='flex items-center gap-x-2 justify-between'>
                        <p>{l}</p>
                        <Button variant="ghost" onClick={() => handleRemove(idx)} className='w-fit h-fit rounded-full p-1'><TrashIcon className='text-red-500 h-5 w-5' /></Button>
                    </li>)}
                </ul>
                <DialogFooter>
                    <Button onClick={handleSave} disabled={loading} variant="default">{loading ? "Saving..." : "Save changes"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddPinnedContentModal