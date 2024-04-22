'use client';
import BoxedContent from '@/components/common/BoxedContent';
import Title from '@/components/common/Seller/Shared/Title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatePayout from './CreatePayout';
import ListPayouts from './ListPayouts';
export default function Payouts() {
  return (
    <BoxedContent className="py-5">
      <Title title="Payouts" />
      <Tabs defaultValue="Create Payout" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="Create Payout">Create Payout</TabsTrigger>
          <TabsTrigger value="List Payouts">List All Payouts</TabsTrigger>
        </TabsList>
        <TabsContent value="Create Payout">
          <CreatePayout />
        </TabsContent>
        <TabsContent value="List Payouts">
          <ListPayouts />
        </TabsContent>
      </Tabs>
    </BoxedContent>
  );
}
