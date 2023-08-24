'use client';

import Products from '@/components/common/Buyer/Products';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/components/common/CategoryDropdown';

const getCategoriesList = (categories: any) => {
  let list: any = categories?.map((c: any) => {
    return {
      id: c.id,
      name: c.title,
      subCategories: c.list,
      lifeSpan: c.lifeSpaan,
      image: c.image,
      slug: c.title,
      href: '/products?category'
    };
  });
  return list;
};
export default function Index() {
  const { user } = useCurrentUser();
  const { categories: allCategories } = useCategories();
  let categories = getCategoriesList(allCategories);
  const filteredCategories =
    user?.favourites?.length > 0
      ? categories.filter((c: Category) => user.favourites.includes(c.name))
      : categories;
  return <Products foryou categories={filteredCategories} />;
}
