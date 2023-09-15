'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  amount: number;
  time: Date;
  month: string;
  status: string;
};

export default function Overview({ sales, overviewTitle }: { sales: Props[], overviewTitle: string }) {
  function getMonthData(month: string) {
    let thisMonth = 0;
    sales.forEach((e: any) => {
      if (e.month === month) thisMonth += parseInt(e.amount);
    });
    return thisMonth;
  }
  function getSalesDataYearly() {
    const data: {
      name: string;
      total: number;
    }[] = [];
    labels.map((month: string) => {
      const sale = getMonthData(month);
      data.push({ name: month, total: sale });
    });
    return data;
  }
  const yearlyData = getSalesDataYearly();
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{overviewTitle}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={yearlyData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={window.innerWidth < 2000 ? 12 : 18}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={window.innerWidth < 2000 ? 12 : 18}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="#5A3A1E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
