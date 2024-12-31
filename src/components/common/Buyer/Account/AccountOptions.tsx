import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import useLocale from '@/hooks/useLocale';

export type Option = {
  name: string;
  slug: string;
  href: string;
};

type AccountOptionProps = {
  selectedOption: string | null;
  options: Option[];
};

export default function AccountOption({ options, selectedOption }: AccountOptionProps) {
  const locale = useLocale();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="block w-full sm:w-48 space-y-4">
      <ul className="sm:space-y-1  md:justify-between  flex-wrap gap-x-4  gap-y-2 md:gap-y-0 md:gap-x-0   flex flex-row  sm:flex-col items-center sm:items-start  sm:uppercase text-xs sm:text-sm hover:text-neutral-400">
        {options.map((category, idx) => (
          <li
            key={idx}
            className="tracking-wide  cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
          >
            {category.slug === 'experts' ? (
              <Link
                className={category.slug === selectedOption ? 'font-medium' : ''}
                href={category.href}
              >
                {category.name}
              </Link>
            ) : (
              <Link
                className={category.slug === selectedOption ? 'font-medium' : ''}
                href={`/${locale}${category.href}=${category.slug}`}
              >
                {category.name}
              </Link>
            )}
          </li>
        ))}
        <li className={` cursor-pointer  hover:underline underline-offset-4`}>
          <Link href={`/chat`}>Chat</Link>
        </li>
        <li
          onClick={handleLogout}
          className={` cursor-pointer text-red-600 hover:text-red-900 hover:underline underline-offset-4`}
        >
          Log out
        </li>
      </ul>
    </div>
  );
}
