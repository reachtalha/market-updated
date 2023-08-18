'use client';
import Image from '@/components/common/FallbackImage';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import BoxedContent from '@/components/common/BoxedContent';

import useClickOutside from '@/hooks/useClickOutside';
import { useDebounce } from '@/hooks/useDebounce';

import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

type SearchbarProps = {
  isOpen: boolean;
  toggleSearchBar: Function;
};

const quickLinks = [
  {
    id: 1,
    name: 'Apparels',
    link: '/products?category=organic%20clothing%20&%20apparel'
  },
  {
    id: 2,
    name: 'Sweat Shirts',
    link: '/products?category=organic%20clothing%20&%20apparel'
  },
  {
    id: 3,
    name: 'Essential Oils',
    link: '/products?category=organic%20hair%20oil'
  },
  {
    id: 4,
    name: 'Cosmetics',
    link: '/products?category=organic%20cosmetics'
  }
];
export default function Searchbar({ isOpen, toggleSearchBar }: SearchbarProps) {
  const router = useRouter();
  const [searchQuery, setQuery] = useState('');
  const [result, setResult] = useState<any>([]);

  const debouncedSearch = useDebounce(searchQuery, 150);

  useEffect(() => {
    if (debouncedSearch) {
      search();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setResult([]);
    }
  }, [searchQuery]);

  async function search() {
    const nameQuery = getDocs(
      query(
        collection(db, 'products'),
        where('name', '>=', `${searchQuery.toLocaleLowerCase()}`),
        where('name', '<=', `${searchQuery.toLocaleLowerCase()}\uf8ff`),
        limit(5)
      )
    );
    const typeQuery = getDocs(
      query(
        collection(db, 'products'),
        where('type', '>=', `${searchQuery.toLocaleLowerCase()}`),
        where('type', '<=', `${searchQuery.toLocaleLowerCase()}\uf8ff`),
        limit(5)
      )
    );
    const shopQuery = getDocs(
      query(
        collection(db, 'products'),
        where('shopName', '>=', `${searchQuery.toLocaleLowerCase()}`),
        where('shopName', '<=', `${searchQuery.toLocaleLowerCase()}\uf8ff`),
        limit(5)
      )
    );

    const [nameQuerySnapshot, typeQuerySnapshot, shopQuerySnapshot] = await Promise.all([
      nameQuery,
      shopQuery,
      typeQuery
    ]);
    const nameList: any = [];
    nameQuerySnapshot.forEach((r) => {
      nameList.push({
        id: r.id,
        image: r.data().coverImage,
        name: r.data().name,
        shop: r.data().shopName
      });
    });
    const shopList: any = [];
    shopQuerySnapshot.forEach((r) => {
      shopList.push({
        id: r.id,
        image: r.data().coverImage,
        name: r.data().name,
        shop: r.data().shopName
      });
    });
    const typeList: any = [];
    typeQuerySnapshot.forEach((r) => {
      typeList.push({
        id: r.id,
        image: r.data().coverImage,
        name: r.data().name,
        shop: r.data().shopName
      });
    });
    const list = [...nameList, ...shopList, ...typeList];
    setResult(list.filter((a, i) => list.findIndex((s) => a.id === s.id) === i));
  }

  const searchBoxRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchBoxRef, toggleSearchBar);

  const handleClick = (ref: string) => {
    toggleSearchBar(false);
    router.push(ref);
  };
  return (
    <div
      ref={searchBoxRef}
      tabIndex={0}
      className={cn(
        'invisible shadow shadow-gray-200 absolute h-0 transition-all ease-in duration-100 w-full bg-white text-black',
        isOpen && 'visible h-auto pb-5'
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
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>

        {searchQuery.length > 0 ? (
          <div className="flex flex-col ms-7 mt-2 gap-y-2 items-start">
            {result.length > 0 ? (
              result.map((product: any, index: number) => (
                <div
                  onClick={() => handleClick('/products/' + product.id)}
                  key={index}
                  className="w-full flex cursor-pointer gap-x-2  flex-row items-center hover:bg-neutral-100 rounded p-1"
                >
                  <div className="relative w-20 h-20 rounded">
                    <Image
                      src={product.image}
                      className="object-cover drop-shadow-sm"
                      alt={'product'}
                      fill={true}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="font-medium capitalize ">{product.name}</div>
                    <div className="text-sm">by <span className="capitalize">{product.shop}</span></div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" py-6 flex items-center justify-center w-full">
                <span>No result found</span>
              </div>
            )}
          </div>)
          : (<>
            <h3 className="uppercase text-gray-500 mt-4">Quick Links</h3>
            <ul className="flex flex-col gap-y-4 mt-4">
              {quickLinks.map((item) => (
                <li className="" key={item.id}>
                  <button
                    className="flex items-center gap-4 uppercase hover:underline"
                    onClick={() => handleClick(item.link)}
                  >
                    <ArrowRight className="text-gray-500" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </>)}
      </BoxedContent>
    </div>
  );
}
