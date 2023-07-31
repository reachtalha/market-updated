import React from 'react';

import Chats from '@/components/modules/chat/Chat';

import { ArrowLeft } from 'lucide-react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative grid h-screen w-full md:overflow-hidden place-content-center bg-gray-100">
      <button className="hidden md:block fixed left-5 top-3 z-50 rounded-full border bg-white p-2 hover:bg-gray-100">
        <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
      </button>
      <div className="overflow-hidden w-screen h-screen md:h-full md:mx-auto md:flex gap-2 px-0 md:px-3 py-0 md:flex-row md:gap-5 md:py-10 lg:w-[900px] 2xl:w-[1020px]">
        <div
          className={`  h-full md:h-fit md:max-h-[36rem] overflow-x-auto rounded-none md:rounded-xl border bg-white p-3 drop-shadow-md md:w-[32rem] md:overflow-hidden`}
        >
          <Chats />
        </div>
        <section
          className={`relative pb-2 md:pb-0 flex w-full h-full md:h-[36rem] flex-col rounded-none md:rounded-xl border bg-white 2xl:h-[40rem]`}
        >
          {children}
        </section>
      </div>
    </section>
  );
};

export default ChatLayout;
