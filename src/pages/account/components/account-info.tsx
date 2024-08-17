import { Card, CardContent } from "@/components/ui/card";

type AccountInfoProps = {
  name: string;
  surname: string;
  accountNumber: string;
  ledger: {
    createdAt: string;
    value: number;
  }[];
};

export function AccountInfo({ ledger, name, surname, accountNumber }: AccountInfoProps) {
  const totalBalance = ledger.reduce((acc, curr) => acc + curr.value, 0);

  const balanceStyle = totalBalance >= 0 ? "text-green-600" : "text-red-600";

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-col mt-4">
            <p className="font-bold text-xl">Account (N° {accountNumber})</p>
            <p className="font-bold">Hello, {name.toUpperCase()} {surname.toUpperCase()} !</p>
            <p className={`font-bold ${balanceStyle} text-2xl mt-2`}>
              Balance: $ {totalBalance.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
