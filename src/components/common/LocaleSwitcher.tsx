'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n-config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import useLocale from '@/hooks/useLocale';

const localeMapper = {
  'en': 'English',
  'nl': 'Dutch'
}

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  // @ts-ignore
  const selectedLocale = localeMapper[locale];

  return (
    <div className="flex gap-2">
      <p>Language:</p>
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center capitalize font-america text-sm">
        {selectedLocale}
        <ChevronDownIcon height={19} width={19} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem className="w-full p-0" key={localeMapper[locale]}>
              <Link className="w-full h-full px-2 py-1" href={redirectedPathName(locale)}>{localeMapper[locale]}</Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
