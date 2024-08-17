import * as React from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"

const columns: ColumnDef<SpecifiedTransactionsData>[] = [
    {
      accessorKey: "senderAccountNumber",
      header: "Sender Account",
      cell: ({ row }) => <div>{row.original.senderAccountNumber}</div>,
    },
    {
      accessorKey: "receiverAccountNumber",
      header: "Receiver Account",
      cell: ({ row }) => <div>{row.original.receiverAccountNumber}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const isTypeOutgoing = row.original.type === "outgoing";
        const Icon = isTypeOutgoing ? ArrowLeftCircle : ArrowRightCircle;
        const color = isTypeOutgoing ? "text-red-500" : "text-green-500";
        return <Icon className={`h-5 w-5 ${color}`} />;
      },
    },
    {
      accessorKey: "value",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Value
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.original.value;
        const formattedValue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
        return (
          <p className="font-bold">
            {formattedValue}
          </p>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Date
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <div>{date.toLocaleDateString()}</div>;
      },
      enableSorting: true,
    },
  ];

export type AccountTransactionsData = {
    receiverAccountNumber: string;
    senderAccountNumber: string;
    value: number;
    createdAt: string;
};

export type SpecifiedTransactionsData = AccountTransactionsData & {
    type: "incoming" | "outgoing";
};

export function AccountTransactionsTable({
    accountNumber,
    transactions,
    // refetchData
}: {
    accountNumber: string;
    transactions: AccountTransactionsData[];
    // refetchData: () => void;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [specifiedTransactions, setSpecifiedTransactions] = React.useState<SpecifiedTransactionsData[]>([]);


    useEffect(() => {
        setSpecifiedTransactions(transactions.map(transaction => ({
            ...transaction,
            type: transaction.senderAccountNumber === accountNumber ? "outgoing" : "incoming"
        })))
    }, [transactions, accountNumber])


    const table = useReactTable({
        data: specifiedTransactions ?? [],
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <>
            <h3 className="font-bold text-2xl mb-4">Transactions</h3>
            <div className="rounded-md border overflow-y-auto md:max-h-[406px] mt-6">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No recent transactions.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-row gap-4 mt-6 md:mt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Button>
            </div>
        </>
    )
}