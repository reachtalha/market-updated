'use client';
import React from 'react';
import { PanelLeftOpen } from 'lucide-react';
import useGlobalStore from '@/state';

type Props = {};

const MobileNavbar = (props: Props) => {
  const { showSidebar, setShowSidebar } = useGlobalStore((state: any) => state);

  return (
    <div className="sm:hidden h-14 w-full border-b px-2 flex flex-row items-center justify-center">
      {!showSidebar && (
        <div
          onClick={() => setShowSidebar(true)}
          className="h-10 w-10 bg-gray-300 float-left mr-auto rounded-full flex items-center justify-center"
        >
          <PanelLeftOpen />
        </div>
      )}

      <span className={` ${!showSidebar && ' mr-auto'}`}>All Organics</span>
    </div>
  );
};

export default MobileNavbar;
