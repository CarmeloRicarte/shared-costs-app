import './styles/BalanceByFriend.css';

import React, { useEffect } from 'react';

import { useBalances, useCosts } from '../../hooks';

export const BalanceByFriend: React.FC = () => {
  const { balances, calculateBalance } = useBalances();
  const { costs } = useCosts();

  useEffect(() => {
    costs.length > 0 && calculateBalance();
  }, []);

  useEffect(() => {
    costs.length > 0 && calculateBalance();
  }, [costs]);

  return (
    <section className='balance default-section'>
      <h2>Balance</h2>
      {balances.map((balance) => (
        <div key={balance.friendName}>
          <span>{balance.friendName}</span>
          <span className={balance.balance >= 0 ? 'text-green' : 'text-red'}>
            {balance.balance.toFixed(2)} €
          </span>
        </div>
      ))}
    </section>
  );
};
