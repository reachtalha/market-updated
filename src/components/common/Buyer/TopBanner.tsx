import Link from 'next/link';
import { auth } from '@/lib/firebase/client';

export default function TopBanner({ dictionary }: { dictionary: any}){
  return (
    <div className="text-center py-2 font-medium text-sm bg-primary text-white">
      {dictionary.text} {!auth.currentUser ? <Link className="underline" href="/auth/register">{dictionary.signUpText}</Link> : <Link className="underline" href="/products">{dictionary.exploreProductsLinkText}</Link>}
    </div>
  )
}