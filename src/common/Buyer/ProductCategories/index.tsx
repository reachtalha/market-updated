import Link from "next/link";

const categories = [
  {
    name: 'Shop All',
    slug: 'all'
  },
  {
    name: 'deodorants',
    slug: 'deodorants'
  },
  {
    name: 'face',
    slug: 'face'
  },
  {
    name: 'body',
    slug: 'body'
  },
  {
    name: 'sunscreen',
    slug: 'sunscreen'
  }
]

type ProductCategoriesProps = {
  selectedCategory: string | null
}

export default function ProductCategories({ selectedCategory }: ProductCategoriesProps){
  return (
    <div className="w-48 space-y-4">
      <p className="uppercase tracking-wide text-sm">Skin care</p>
      <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
        {
          categories.map((category, idx) =>
            (
              <li key={idx} className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
                <Link className={category.slug === selectedCategory ? 'font-medium' : ''} href={`/products?category=${category.slug}`}>{category.name}</Link>
              </li>
            )
          )}
      </ul>
    </div>
  )
}