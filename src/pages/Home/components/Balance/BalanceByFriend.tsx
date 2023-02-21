import './styles/BalanceByFriend.css';

import React, { useEffect } from 'react';

import { useHomeContext } from '../../context';

export interface FriendBalance {
  personName: string;
  totalAmount: number;
}

export const BalanceByFriend: React.FC = () => {
  const { costs, balances, setBalances } = useHomeContext();
  useEffect(() => {
    costs.length > 0 && calculateBalance();
  }, [costs]);

  /**
   * It takes an array of objects, and returns an array of objects, where each object has a personName
   * and a totalAmount
   * @returns An array of objects with the personName and totalAmount properties.
   */
  const getCostsPaid = () => {
    const costsMapped = costs.map((cost) => ({
      personName: cost.personName,
      totalAmount: cost.totalAmount,
    }));

    return costsMapped.reduce(
      (acc: FriendBalance[], { personName, totalAmount }) => {
        const personExisting = acc.find(
          (personBalance) => personBalance.personName === personName
        );

        if (personExisting !== undefined) {
          personExisting.totalAmount += totalAmount;
        } else {
          acc.push({ personName, totalAmount });
        }

        return acc;
      },
      []
    );
  };

  /**
   * It calculates the balance of each friend by subtracting the average amount paid by each friend
   * from the total amount paid by each friend
   */
  const calculateBalance = () => {
    const costsPaidByFriend = getCostsPaid();
    const totalPaid = costsPaidByFriend.reduce(
      (acc, person) => acc + person.totalAmount,
      0
    );
    const average = totalPaid / costsPaidByFriend.length;
    const balances = costsPaidByFriend.map((friendBalance) => ({
      friendName: friendBalance.personName,
      balance: friendBalance.totalAmount - average,
    }));
    setBalances(balances);
  };

  return (
    <div className='balance'>
      <h2>Balance</h2>
      {balances?.map((balance) => (
        <div key={balance.friendName}>
          <span>{balance.friendName}</span>
          <span className={balance.balance >= 0 ? 'text-green' : 'text-red'}>
            {balance.balance.toFixed(2)} €
          </span>
        </div>
      ))}
    </div>
  );
};
