import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AccountTransactionsData } from "@/pages/account/components/transaction-table";

type TransactionByMonth = {
    incoming: number;
    outgoing: number;
};

type TransactionsByMonthMap = {
    [key: string]: TransactionByMonth;
};

const chartConfig = {
    incoming: {
        label: "Incoming  ",
        color: "#22c55e",
        
    },
    outgoing: {
        label: "Outgoing  ",
        color: "#b91c1c",
    },
} satisfies ChartConfig;

export function TransactionChart({
    accountNumber,
    transactions,
}: {
    accountNumber: string;
    transactions: AccountTransactionsData[];
}) {
    const transactionsByMonth: TransactionsByMonthMap = transactions.reduce(
        (acc, curr) => {
            const month = new Date(curr.createdAt).toLocaleDateString("en-US", { month: "long" });

            if (!acc[month]) {
                acc[month] = { incoming: 0, outgoing: 0 };
            }

            const typeOfTransaction = curr.senderAccountNumber === accountNumber ? "outgoing" : "incoming";
            acc[month][typeOfTransaction] += curr.value;

            return acc;
        },
        {} as TransactionsByMonthMap
    );

    const chartData = Object.entries(transactionsByMonth).map(([month, transactions]) => ({
        month,
        incoming: transactions.incoming,
        outgoing: transactions.outgoing,
    }));

    return (
        <div className="p-2 md:h-[400px] mt-8 overflow-x-auto">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart data={chartData} barSize={10}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                        tickFormatter={(value) => value}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="incoming" fill="#22c55e" radius={4} />
                    <Bar dataKey="outgoing" fill="#b91c1c" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
