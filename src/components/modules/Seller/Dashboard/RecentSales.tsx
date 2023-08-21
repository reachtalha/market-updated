import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { formatCurrency, formatMonth } from "@/utils/formatters"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Props = {
    id: string,
    firstName: string,
    lastName: string,
    amount: number,
    time: Date,
    month: string,
    status: string,
    photoURL?: string,
    email?: string
}

export function RecentSales({ sales }: { sales: Props[] }) {
    function getMonthData(month: string) {
        let thisMonth = 0;
        sales.forEach((e: any) => {
            if (e.month === month) thisMonth++;
        });
        return thisMonth;
    }
    const thisMonthSales = getMonthData(formatMonth(new Date()));
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    You made {thisMonthSales} {thisMonthSales > 1 ? "sales" : "sale"} this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {
                        sales.map((s) => (
                            <div key={s.id} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={s.photoURL} alt="Avatar" />
                                    <AvatarFallback>{s.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm capitalize font-medium leading-none">{s.firstName} {s.lastName}</p>
                                    <p className="text-sm text-muted-foreground">{s.email ?? null}</p>
                                </div>
                                <div className="ml-auto font-medium">{formatCurrency(s.amount)}</div>
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}