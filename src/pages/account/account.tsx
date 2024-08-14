import { useState, useCallback, startTransition } from 'react';
import { Button } from '@/components/ui/button'; 
import { TransactionForm } from "./transaction-form";
import { getAccountQuery } from '@/api/__generated__/getAccountQuery.graphql';
import { GetAccountQuery } from '@/api/queries/get-account';
import { useLazyLoadQuery } from 'react-relay';
import { AccountTransactionsData, TransactionsTable } from './transactions-table';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router';

export function Account() {
  const navigate = useNavigate();
  const [view, setView] = useState<'form' | 'history'>('form');
  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState(null);
  const { user } = useAuth();

  const refresh = useCallback(() => {
    startTransition(() => {
      // @ts-expect-error - Type error
      // Ref: https://relay.dev/docs/guided-tour/refetching/refreshing-queries/
      setRefreshedQueryOptions(prev => ({
        // @ts-expect-error - expected
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
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#0a0a0a] text-white flex items-center p-4 rounded-b-lg shadow-md fixed top-0 left-0 right-0" style={{ height: '60px', zIndex: 1 }}>
        <Button
          onClick={() => setView('form')}
          className="text-white mr-4 bg-transparent"
        >
          New Transaction
        </Button>
        <Button
          onClick={() => setView('history')}
          className="text-white mr-4 bg-transparent"
        >
          History
        </Button>
        <Button
          onClick={handleLogout}
          className="bg-white text-black ml-auto"
        >
          Log Out
        </Button>
      </div>
      <div className="flex-grow p-4 pt-16">
        <div className="max-w-[600px] mx-auto">
          {view === 'form' ? (
            <TransactionForm />
          ) : (
            <TransactionsTable 
              transactions={transactions as unknown as AccountTransactionsData[]} 
              refetchData={refresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}
