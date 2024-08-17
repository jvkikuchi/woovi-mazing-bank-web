import { Button } from '@/components/ui/button';
import { TransactionForm } from "./components/transaction-form";
import { getAccountQuery } from '@/api/__generated__/getAccountQuery.graphql';
import { GetAccountQuery } from '@/api/queries/get-account';
import NoData from "@/assets/no-data.svg"
import { useLazyLoadQuery } from 'react-relay';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router';
import { AccountInfo } from './components/account-info';
import { AccountTransactionsTable } from './components/transaction-table';
import { LogOut } from 'lucide-react';
import { TransactionChart } from '@/components/transactions-chart';
import { useCallback, useState, startTransition } from 'react';

export function Account() {
  const navigate = useNavigate();
  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState(null);
  const { user } = useAuth();

  const refresh = useCallback(() => {
    startTransition(() => {
      // @ts-expect-error - Expected error, ref: https://relay.dev/docs/guided-tour/refetching/refreshing-queries/#when-using-uselazyloadquery
      setRefreshedQueryOptions(prev => ({
        // @ts-expect-error - Expected error
        fetchKey: (prev?.fetchKey ?? 0) + 1,
        fetchPolicy: 'network-only',
      }));
    });
  }, []);

  const { getAccount } = useLazyLoadQuery<getAccountQuery>(
    GetAccountQuery,
    { accountNumber: user!.accountNumber! },
    refreshedQueryOptions ?? {}
  );

  const transactions = getAccount?.transactions ?? [];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#0a0a0a] text-white flex items-center p-4 rounded-b-lg shadow-md mb-6" style={{ height: '60px', zIndex: 1 }}>
        <Button onClick={handleLogout} className="bg-white text-black"><LogOut /></Button>
      </div>
      <div className="flex flex-col p-4 gap-4 md:grid grid-cols-2">
        <div>
          <div className="flex flex-col gap-4">
            <AccountInfo
              name={user?.name as string}
              surname={user?.surname as string}
              accountNumber={user?.accountNumber as string}
              // @ts-expect-error - Expected error
              ledger={getAccount?.ledger as unknown as Record<string, unknown>}
            />
            <TransactionForm refresh={refresh} />
          </div>
        </div>
        <div className="flex-grow overflow-auto">
          <AccountTransactionsTable
            // @ts-expect-error - Expected error
            transactions={transactions}
            accountNumber={user?.accountNumber as string} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <h3 className='font-bold text-2xl'>Transactions Insights</h3>
        {transactions.length > 0 ? (
          // @ts-expect-error - Expected error
          <TransactionChart transactions={transactions} accountNumber={user?.accountNumber as string} />
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 p-4'>
            <p className='font-bold text-1xl'>No transactions to generate chart</p>
            <NoData />
          </div>
        )}
      </div>
    </div>
  );
}
