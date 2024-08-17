import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { useMutation } from "react-relay"
import { toast } from "@/components/ui/use-toast"
import { NewTransactionMutation } from "@/api/mutations/new-transaction.mutation"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const transactionFormSchema = z.object({
    receiver: z.string(),
    amount: z.string().refine((value) => Number(value) > 0, "Amount must be greater than 0"),
})

export const TransactionForm = ({ refresh }: { refresh: () => void }) => {
    const [createTransactionMutation] = useMutation(NewTransactionMutation);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth();

    const createTransactionOnSubmit = (input: z.infer<typeof transactionFormSchema>) => {
        setIsLoading(true);

        createTransactionMutation({
            variables: {
                receiverAccountNumber: input.receiver,
                senderAccountNumber: user!.accountNumber!,
                value: parseInt(input.amount),
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error Creating Transaction",
                    description: "Something went wrong, try again. If the problem persists, contact support.",
                });

                return;
            },
            onCompleted: (response, errors) => {
                if (!response) {
                    toast({
                        variant: "destructive",
                        title: "Error Creating Transaction",
                        description: "Something went wrong, try again",
                    });

                    setIsLoading(false);

                    return;
                }

                if (errors?.length) {
                    toast({
                        variant: "destructive",
                        title: "Error Creating Transaction",
                        description: errors[0].message,
                    });

                    setIsLoading(false);

                    return;
                }

                toast({
                    variant: "default",
                    title: "Transaction Created",
                    description: "Your transaction has been created successfully.",
                });

                setIsLoading(false);
                refresh();
            },
        });
    };

    const transactionForm = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            receiver: "",
            amount: "",
        }
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>New Transaction</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...transactionForm}>
                    <form onSubmit={transactionForm.handleSubmit(createTransactionOnSubmit)} className="space-y-4">
                        <FormField control={transactionForm.control} name="receiver" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver</FormLabel>
                                <FormControl>
                                    <Input placeholder="Account number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the account number you want to send money to.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={transactionForm.control} name="amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="string" placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the money amount you want to send.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        {<Button type="submit" disabled={isLoading} className="w-full font-bold text-md">
                            {isLoading ?
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send"}
                        </Button>}
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}