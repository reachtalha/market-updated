import Link from 'next/link';
import { auth } from '@/lib/firebase/client';

export default function TopBanner(){
  return (
    <div className="text-center py-2 font-medium text-sm bg-primary text-white">
      Enjoy 10% off your first order. {!auth.currentUser ? <Link className="underline" href="/auth/register">Sign up</Link> : <Link className="underline" href="/products">Explore Products</Link>}
    </div>
  )
}