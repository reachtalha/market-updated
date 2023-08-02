import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import BoxedContent from '@/components/common/BoxedContent';

import useClickOutside from '@/hooks/useClickOutside';

type SearchbarProps = {
  isOpen: boolean;
  toggleSearchBar: Function;
};

const quickLinks = [
  {
    id: 1,
    name: 'BODY WASH',
    link: '/products/123'
  },
  {
    id: 2,
    name: 'BODY WASH',
    link: '/products/123'
  },
  {
    id: 3,
    name: 'BODY WASH',
    link: '/products/123'
  },
  {
    id: 4,
    name: 'BODY WASH',
    link: '/products/123'
  }
];
export default function Searchbar({ isOpen, toggleSearchBar }: SearchbarProps) {
  const searchBoxRef = useRef(null);
  useClickOutside(searchBoxRef, toggleSearchBar);
  return (
    <div
      ref={searchBoxRef}
      tabIndex={0}
      className={cn(
        'invisible shadow shadow-gray-200 absolute h-0 transition-all ease-in duration-100 w-full bg-white text-black',
        isOpen && 'visible h-[400px]'
      )}
    >
      <BoxedContent className="mt-16">
        <form className="pt-6">
          <div className="flex gap-2 items-center">
            <SearchIcon height={25} width={25} />
            <Input
              autoFocus
              className="bg-transparent placeholder:text-black focus-visible:ring-0 border-0 outline-0 text-2xl"
              placeholder="Search all Organic"
            />
          </div>
        </form>

        <h3 className="uppercase text-gray-500 mt-4">Quick Links</h3>
        <ul className="flex flex-col gap-y-4 mt-4">
          {quickLinks.map((item) => (
            <li onClick={() => toggleSearchBar} className="" key={item.id}>
              <Link className="flex items-center gap-4 hover:underline" href={item.link}>
                <ArrowRight className="text-gray-500" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </BoxedContent>
    </div>
  );
}
