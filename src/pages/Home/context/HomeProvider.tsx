import { FC, ReactNode, useMemo, useState } from 'react';

import { Balance, Friend, Group } from '../models';
import { Cost } from '../models/Cost';
import { HomeContext } from './HomeContext';

export interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider: FC<HomeProviderProps> = ({ children }) => {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);

  const contextValue = useMemo(
    () => ({
      costs,
      setCosts,
      friends,
      setFriends,
      groups,
      setGroups,
      balances,
      setBalances,
    }),
    [
      costs,
      setCosts,
      friends,
      setFriends,
      groups,
      setGroups,
      balances,
      setBalances,
    ]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};
