import { useEffect } from 'react';

import { useLocalStorage } from '../../../hooks';
import { useHomeContext } from '../context';
import { Friend } from '../models';
import { getFriends } from '../services';

export const useFriends = () => {
  const { friends, setFriends } = useHomeContext();
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    void getAllFriends();
  }, []);

  const setFriendsContextAndLocalStorage = (friends: Friend[]) => {
    setFriends(friends);
    setItem('friends', friends);
  };

  const getAllFriends = async () => {
    if (getItem('friends')) {
      setFriendsContextAndLocalStorage(getItem('friends'));
    } else {
      const friends = await getFriends();
      friends && setFriendsContextAndLocalStorage(friends);
    }
  };

  const addFriend = (friend: Friend) => {
    const newFriends = [...friends, friend];
    setFriendsContextAndLocalStorage(newFriends);
  };

  return {
    friends,
    getAllFriends,
    addFriend,
    setFriendsContextAndLocalStorage,
  };
};
