// import { useState, useCallback, startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { TransactionForm } from "./components/transaction-form";
import { getAccountQuery } from '@/api/__generated__/getAccountQuery.graphql';
import { GetAccountQuery } from '@/api/queries/get-account';
import { useLazyLoadQuery } from 'react-relay';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router';
import { AccountInfo } from './components/account-info';
import { AccountTransactionsTable } from './components/test-table';

export function Account() {
  const navigate = useNavigate();
  // const [refreshedQueryOptions, setRefreshedQueryOptions] = useState(null);
  const { user } = useAuth();

  // const refresh = useCallback(() => {
  //   startTransition(() => {
  //     // @ts-expect-error- asdas
  //     setRefreshedQueryOptions(prev => ({
  //             // @ts-expect-error- asdas

  //       fetchKey: (prev?.fetchKey ?? 0) + 1,
  //       fetchPolicy: 'network-only',
  //     }));
  //   });
  // }, []);

  const { getAccount } = useLazyLoadQuery<getAccountQuery>(
    GetAccountQuery,
    { accountNumber: user!.accountNumber! },
    // refreshedQueryOptions ?? {}
  );

  const transactions = getAccount?.transactions ?? [];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#0a0a0a] text-white flex items-center p-4 rounded-b-lg shadow-md fixed top-0 left-0 right-0" style={{ height: '60px', zIndex: 1 }}>
        <Button onClick={handleLogout} className="bg-white text-black ml-auto md: ml-0">Log Out</Button>
      </div>
      <div className="flex-grow p-4 pt-24 md:grid md:grid-cols-2 md:gap-4 w-auto sm: pl-4">
        <div className="flex flex-col gap-4">
          <AccountInfo
            name={user?.name as string}
            surname={user?.surname as string}
            accountNumber={user?.accountNumber as string}
            //@ts-expect-error - asdas
            ledger={getAccount?.ledger as unknown as Record<string, unknown>}
          />
          <TransactionForm />
        </div>
        <div className="flex-grow overflow-auto">
          <AccountTransactionsTable transactions={transactions as any} accountNumber={user?.accountNumber as string} />
        </div>
      </div>
    </div>
  );
}
