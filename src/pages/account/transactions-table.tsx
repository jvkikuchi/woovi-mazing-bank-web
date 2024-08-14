import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export type AccountTransactionsData = {
    receiverAccountNumber: string;
    senderAccountNumber: string;
    value: number;
    createdAt: string;
};

export const TransactionsTable = ({
    transactions,
    refetchData
}: {
    transactions: AccountTransactionsData[];
    refetchData: () => void;
}) => {
    const [isRefetching, setIsRefetching] = useState(false);
    const tableHeaders = ['Receiver Account', 'Sender Account', 'Value', 'Transaction Date'];


    const handleRefetchState = async () => {
        setIsRefetching(true);

        try {
            refetchData();
            setIsRefetching(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setIsRefetching(false)
        }
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
            </div>
            <Table>
                <TableCaption className="text-center text-gray-600 font-bold">
                    <div className="flex flex-col gap-4">
                        {transactions.length > 0 ? 'Transaction History' : 'No transactions found.'}
                        {<Button onClick={() => handleRefetchState()} className="text-white bg-black">
                            {isRefetching ?
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Refetch Data"}
                        </Button>}
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        {tableHeaders.map((header, index) => (
                            <TableHead key={index} className="w-[150px]">
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length > 0 && transactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{transaction.receiverAccountNumber}</TableCell>
                            <TableCell>{transaction.senderAccountNumber}</TableCell>
                            <TableCell>{transaction.value}</TableCell>
                            <TableCell>{transaction.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
