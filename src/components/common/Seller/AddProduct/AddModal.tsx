import React, { useState } from 'react';

//import * as Dialog from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Plus, X } from 'lucide-react';

type Props = {
  list: string[];
  setList: React.Dispatch<React.SetStateAction<any>>;
};

export default function AddModal({ list, setList }: Props) {
  const [item, setItem] = useState<string>('');
  console.log('Here');
  const addData = () => {
    if (item.length === 0) {
      alert('Please add item');
      return;
    }
    if (!list?.includes(item)) {
      setList((prev: string[]) => [...prev, item]);
      setItem('');
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center gap-x-1 px-3 py-1 rounded-full border bg-gray-100 text-gray-800 hover:bg-gray-200">
            <span>
              <Plus className="w-4 h-4 text-gray-600" strokeWidth={1.5} color="currentColor" />
            </span>
            Add more
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="DialogTitle capitalize">Add Items</DialogTitle>
            <DialogDescription className="DialogContent w-full md:w-fit h-fit">
              <div className="my-3 w-full flex gap-x-1">
                <input
                  type="text"
                  placeholder="Add item"
                  className="border focus:outline-primary rounded-full w-full pl-3 pr-2 py-1"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
                <button onClick={addData} className="px-3 py-1 text-white rounded-full bg-primary">
                  Add
                </button>
              </div>
              <ul className="capitalize list-disc list-inside">
                {list?.map((i: String) => (
                  <li key={Date.now() + Math.random()}>{i}</li>
                ))}
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
