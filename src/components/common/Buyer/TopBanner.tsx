import Link from 'next/link';

export default function TopBanner(){
  return (
    <div className="text-center py-2 font-medium text-sm bg-primary text-white">
      Enjoy 10% off your first order. <Link className="underline" href="/auth/register">Sign up</Link> now.
    </div>
  )
}