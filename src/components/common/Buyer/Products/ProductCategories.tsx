import Link from "next/link";

export type Category = {
  name: string
  slug: string
  href: string
}

type ProductCategoriesProps = {
  selectedCategory: string | null;
  categories: Category[]
};

export default function ProductCategories({
  categories,
  selectedCategory,
}: ProductCategoriesProps) {
  return (
    <div className="w-48 space-y-4">
      <p className="uppercase tracking-wide text-sm">Skin care</p>
      <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
        {categories.map((category, idx) => (
          <li
            key={idx}
            className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
          >
            <Link
              className={
                category.slug === selectedCategory ? "font-medium" : ""
              }
              href={`${category.href}=${category.slug}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
