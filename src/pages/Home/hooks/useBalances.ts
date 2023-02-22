import { useEffect } from 'react';

import { useHomeContext } from '../context';
import { Balance } from '../models';
import { useCosts } from './useCosts';

export const useBalances = () => {
  const { costs } = useCosts();
  const { balances, setBalances } = useHomeContext();
  useEffect(() => {
    costs.length > 0 && calculateBalance();
  }, [costs, balances]);

  /**
   * It takes an array of objects, and returns an array of objects, where each object has a friendName
   * and a balance
   * @returns An array of objects with the friendName and balance properties.
   */
  const getCostsPaid = () => {
    const costsMapped = costs.map((cost) => ({
      friendName: cost.personName,
      balance: cost.totalAmount,
    }));

    return costsMapped.reduce((acc: Balance[], { friendName, balance }) => {
      const personExisting = acc.find(
        (personBalance) => personBalance.friendName === friendName
      );

      if (personExisting !== undefined) {
        personExisting.balance += balance;
      } else {
        acc.push({ friendName, balance });
      }

      return acc;
    }, []);
  };

  /**
   * It calculates the balance of each friend by subtracting the average amount paid by each friend
   * from the total amount paid by each friend
   */
  const calculateBalance = () => {
    const costsPaidByFriend = getCostsPaid();
    const totalPaid = costsPaidByFriend.reduce(
      (acc, person) => acc + person.balance,
      0
    );
    const average = totalPaid / costsPaidByFriend.length;
    const balances = costsPaidByFriend.map((friendBalance) => ({
      friendName: friendBalance.friendName,
      balance: friendBalance.balance - average,
    }));
    setBalances(balances);
  };

  return {
    balances,
  };
};
