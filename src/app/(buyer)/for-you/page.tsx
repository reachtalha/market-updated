'use client';

import Products from '@/components/common/Buyer/Products';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/components/common/CategoryDropdown';
import { ProductsLoader } from '@/components/common/Skeleton/SkeletonLoader';

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
  const { user, isLoading: userLoading } = useCurrentUser();
  const { categories: allCategories, isLoading: categoriesLoading } = useCategories();
  if (userLoading || categoriesLoading) {
    return <ProductsLoader />;
  }
  let categories = getCategoriesList(allCategories);
  const filteredCategories =
    user?.favourites?.length > 0
      ? categories.filter((c: Category) => user.favourites.includes(c.name))
      : categories;
  return <Products foryou categories={filteredCategories} />;
}
