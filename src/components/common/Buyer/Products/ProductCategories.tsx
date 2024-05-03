import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import ReactStar from 'react-stars';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ReactStars = ReactStar as any;

export type Category = {
  name: string;
  slug: string;
  href: string;
  subCategories: string[];
  image: string;
};

type ProductCategoriesProps = {
  categories: Category[];
};

const PriceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });

    const updatedParams = new URLSearchParams(params.toString());
    Object.entries(formDataObj).forEach(([key, value]) => {
      updatedParams.set(key, value);
    });
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  const clearFilter = () => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.delete('min');
    updatedParams.delete('max');
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-2">
        <span className="font-medium text-lg">Price</span>
        <div className="px-2.5 space-y-3">
          <div className="flex items-end gap-x-2.5">
            <div className="space-y-1.5">
              <Label htmlFor="min">Min</Label>
              <Input
                name="min"
                defaultValue={params.get('min') || '0'}
                min="0"
                type="number"
                id="min"
                placeholder="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="max">Max</Label>
              <Input
                name="max"
                defaultValue={params.get('max') || '1000'}
                min="0"
                type="number"
                id="max"
                placeholder="1000"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Apply Filter
          </Button>
        </div>
      </form>
      <Button
        variant="link"
        className={params.get('max') || params.get('min') ? 'block text-sm mt-1.5' : 'hidden'}
        onClick={clearFilter}
      >
        Clear Price Filter
      </Button>
    </>
  );
};

const ReviewFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const rating = params.get('rating');

  const handleSubmit = (rating: string) => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set('rating', rating);
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  const clearFilter = () => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.delete('rating');
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <div className="mb-2">
      <span className="font-medium text-lg">Reviews</span>
      <div className="flex space-x-2 flex-row items-end">
        <ReactStars
          onChange={(rating: string) => handleSubmit(rating)}
          value={rating || 0}
          size={24}
          color2={'#000000'}
        />
        <span className="text-xs">Or Above</span>
      </div>
      <Button variant="link" className={rating ? 'block text-sm' : 'hidden'} onClick={clearFilter}>
        Clear Ratings Filter
      </Button>
    </div>
  );
};

export default function ProductCategories({ categories }: ProductCategoriesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selectedCategory = params.get('category');

  const subCategory = categories.find(
    (category) => category.name.split('&')[0] === selectedCategory
  );

  const handleSubmit = (type: string, value: string) => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set(type, value);
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  const clearFilter = () => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.delete('category');
    updatedParams.delete('type');
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <div className="hidden md:block w-48 space-y-4">
      <Accordion type="single" collapsible defaultValue="item-1" className="border-0">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="hover:no-underline uppercase tracking-wide text-sm pt-0">
            Filter By:
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <PriceFilter />
              <ReviewFilter />
              <span className="font-medium text-lg mb-2">Categories</span>
              <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
                {categories.map((category, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSubmit('category', category.slug)}
                    className="tracking-wide text-sm cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
        {subCategory?.subCategories.map((category, idx) => (
          <li
            key={idx}
            onClick={() => handleSubmit('type', category)}
            className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
          >
            {category}
          </li>
        ))}
      </ul>
      <Button
        variant="link"
        className={selectedCategory ? 'block text-sm' : 'hidden'}
        onClick={clearFilter}
      >
        Clear Filter
      </Button>
    </div>
  );
}
