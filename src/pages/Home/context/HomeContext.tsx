import { createContext, useContext } from 'react';

import { Balance, Cost, Friend, Group } from '../models';

interface IHomeContext {
  costs: Cost[];
  friends: Friend[];
  groups: Group[];
  balances: Balance[];
  setCosts: (costs: Cost[]) => void;
  setFriends: (friends: Friend[]) => void;
  setGroups: (groups: Group[]) => void;
  setBalances: (balances: Balance[]) => void;
}

const initialState: IHomeContext = {
  costs: [],
  friends: [],
  groups: [],
  balances: [],
  setCosts: () => {},
  setFriends: () => {},
  setGroups: () => {},
  setBalances: () => {},
};

export const HomeContext: React.Context<IHomeContext> =
  createContext(initialState);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('HomeContext must be used within a HomemProvider');
  }
  return context;
};
