"use client"
import Checkout from '@/components/common/Buyer/Checkout';
import Payment from '@/components/common/Buyer/Checkout/Payment';
export default function Page(){
  return (
    <Payment>
      <Checkout />
    </Payment>
  )
}