'use client';

import { useState, useEffect } from 'react';
import { useCategories, ICategory } from '@/hooks/useCategories';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import toast from 'react-hot-toast';

const MAX = 5;

const Categories = ({ loading }: { loading: boolean }) => {
  const { categories, isError, isLoading } = useCategories();
  const [selected, setSelected] = useState<string[]>([]);
  const { setValue } = useFormContext();

  console.log('categories - ', categories);

  useEffect(() => {
    setValue('favourites', selected);
  }, [selected]);

  const select = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      if (selected.length >= MAX) {
        toast.error(`You can select up to ${MAX} options only`);
        return;
      }
      setSelected((c) => [...c, category]);
    }
  };

  if (isLoading) {
    return <Loader className="py-16 grid place-content-center h-full w-full" />;
  }

  if (isError) {
    return <Error className="py-16 grid place-content-center h-full w-full" />;
  }
  return (
    <>
      <div className="mb-3">
        <h4 className="text-primary font-semibold text-2xl">Follow Categories</h4>
        <p className="text-neutral-600">You&apos;ll get stuff from these categories</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories?.map((c: ICategory) => (
          <Label key={c.id}>
            <Input
              type="checkbox"
              value={c.title}
              disabled={loading}
              onChange={() => select(c.title)}
              checked={selected.includes(c.title) ? true : false}
              className="peer hidden"
            />
            <div
              className={`w-fit rounded-full border-2 border-gray-300 px-3 py-2 text-sm capitalize peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white 2xl:text-base ${
                loading ? 'opacity-50' : ''
              }`}
            >
              {c.title}
            </div>
          </Label>
        ))}
      </div>
    </>
  );
};

export default Categories;
