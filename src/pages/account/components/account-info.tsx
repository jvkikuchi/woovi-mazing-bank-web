import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type AccountInfoProps = {
  name: string;
  surname: string;
  accountNumber: string;
  ledger: {
    createdAt: string;
    value: number;
  }[];
};

export function AccountInfo({ name, surname, ledger }: AccountInfoProps) {
  const totalBalance = ledger.reduce((acc, curr) => acc + curr.value, 0);

  const balanceStyle = totalBalance >= 0 ? "text-green-600" : "text-red-600";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <p className="font-bold">Welcome back, {name} {surname} !</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="font-bold text-xl">Account Balance</p>
          <p className={`font-bold ${balanceStyle} text-2xl`}>
            $ {totalBalance.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
