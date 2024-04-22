import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency, formatMonth } from '@/utils/formatters';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  amount: number;
  time: Date;
  month: string;
  status: string;
  photoURL?: string;
  email?: string;
  timeStamp: number;
};

export function RecentSales({
  sales,
  recentSalesTitle
}: {
  sales: Props[];
  recentSalesTitle: string;
}) {
  function getMonthData(month: string) {
    let thisMonth = 0;
    sales.forEach((e: any) => {
      if (e.month === month) thisMonth++;
    });
    return thisMonth;
  }
  const thisMonthSales = getMonthData(formatMonth(new Date()));
  return (
    <>
      <CardHeader>
        <CardTitle>{recentSalesTitle}</CardTitle>
        <CardDescription>
          You made {thisMonthSales} {thisMonthSales > 1 ? 'sales' : 'sale'} this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 max-h-full overflow-y-scroll">
        <div className="space-y-8 p-6">
          {sales
            .sort((a, b) => a.timeStamp - b.timeStamp)
            .slice(0, 15)
            .map((s) => (
              <div key={s.id} className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={s.photoURL} alt="Avatar" />
                  <AvatarFallback>{s.firstName[0].toLocaleUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-base 2xl:text-base capitalize font-medium leading-none">
                    {s.firstName} {s.lastName}
                  </p>
                  <p className="text-xs 2xl:text-sm  text-muted-foreground">{s.email ?? null}</p>
                </div>
                <div className="ml-auto 2xl:text-xl font-medium">{formatCurrency(s.amount)}</div>
              </div>
            ))}
        </div>
      </CardContent>
    </>
  );
}
