import { createContext, useContext } from 'react';

import { Cost, Friend, Group } from '../models';

interface IHomeContext {
  costs: Cost[];
  friends: Friend[];
  groups: Group[];
  setCosts: (costs: Cost[]) => void;
  setFriends: (friends: Friend[]) => void;
  setGroups: (groups: Group[]) => void;
}

const initialState: IHomeContext = {
  costs: [],
  friends: [],
  groups: [],
  setCosts: () => {},
  setFriends: () => {},
  setGroups: () => {},
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
