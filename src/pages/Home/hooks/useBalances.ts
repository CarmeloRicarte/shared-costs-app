import { useLocalStorage } from '../../../hooks';
import { useHomeContext } from '../context';
import { Balance } from '../models';
import { useCosts } from './useCosts';
import { useFriends } from './useFriends';

export const useBalances = () => {
  const { costs } = useCosts();
  const { friends: friendsList } = useFriends();
  const { balances, setBalances } = useHomeContext();
  const { setItem } = useLocalStorage();

  const setBalancesContextAndLocalStorage = (balances: Balance[]) => {
    setBalances(balances);
    setItem('balances', balances);
  };

  /**
   * It takes an array of objects, and returns an array of objects, where each object has a friendName
   * and a balance
   * @returns An array of objects with the friendName and balance properties.
   */
  const getCostsPaid = () => {
    const friends = friendsList.map((friend) => friend.name);
    const costFriends = costs.map((cost) => cost.personName);

    const newFriends = friends.filter(
      (friend) => !costFriends.includes(friend)
    );

    const newFriendsBalance: Balance[] = newFriends.map((friend) => ({
      friendName: friend,
      balance: 0,
    }));

    const costsMapped = costs.map((cost) => ({
      friendName: cost.personName,
      balance: cost.totalAmount,
    }));

    const balances = costsMapped.reduce(
      (acc: Balance[], { friendName, balance }) => {
        const personExisting = acc.find(
          (personBalance) => personBalance.friendName === friendName
        );

        if (personExisting !== undefined) {
          personExisting.balance += balance;
        } else {
          acc.push({ friendName, balance });
        }

        return acc;
      },
      []
    );

    const newBalances = [
      ...balances,
      ...(newFriendsBalance ? [...newFriendsBalance] : []),
    ];
    return newBalances;
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
    setBalancesContextAndLocalStorage(balances);
  };

  return {
    balances,
    calculateBalance,
    setBalancesContextAndLocalStorage,
  };
};
