import { FC, ReactNode, useMemo, useState } from 'react';

import { Friend, Group } from '../models';
import { Cost } from '../models/Cost';
import { HomeContext } from './HomeContext';

export interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider: FC<HomeProviderProps> = ({ children }) => {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const contextValue = useMemo(
    () => ({
      costs,
      setCosts,
      friends,
      setFriends,
      groups,
      setGroups,
    }),
    [costs, setCosts, friends, setFriends, groups, setGroups]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};
