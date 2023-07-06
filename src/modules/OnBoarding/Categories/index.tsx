"use client";

import { useState } from "react";
import { useCategories, ICategory } from "@/hooks/useCategories";
import { useFormContext } from "react-hook-form";

import Loader from "@/common/Loader";
import Error from "@/common/Error";
import toast from "react-hot-toast";

const MAX = 5;

const Categories = () => {
  const { categories, isError, isLoading } = useCategories();
  const [selected, setSelected] = useState<string[]>([]);
  const { setValue } = useFormContext();

  if (isLoading) {
    return <Loader className="py-16 grid place-content-center h-full w-full" />;
  }

  if (isError) {
    return <Error className="py-16 grid place-content-center h-full w-full" />;
  }

  const select = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      if (selected.length >= MAX) {
        toast.error(`You can select up to ${MAX} options`);
        return;
      }
      setSelected((c) => [...c, category]);
    }
    setValue("selected", selected);
  };

  return (
    <>
      <div className="mb-3">
        <h4 className="text-primary font-semibold text-2xl">
          Follow Categories
        </h4>
        <p className="text-neutral-600">
          You&apos;ll get stuff from these categories
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories?.map((c: ICategory) => (
          <label key={c.id}>
            <input
              type="checkbox"
              value={c.name}
              onChange={() => select(c.name)}
              checked={selected.includes(c.name) ? true : false}
              className="peer hidden"
            />
            <div className="w-fit rounded-full border-2 border-gray-300 px-3 py-2 text-sm capitalize peer-checked:border-neutral-800 peer-checked:bg-neutral-800 peer-checked:text-white 2xl:text-base">
              {c.name}
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default Categories;