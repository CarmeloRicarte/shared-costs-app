import { useEffect } from 'react';

import { useLocalStorage } from '../../../hooks';
import { useHomeContext } from '../context';
import { Group } from '../models';
import { getGroups } from '../services';

export const useGroups = () => {
  const { groups, setGroups } = useHomeContext();
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    void getAllGroups();
  }, []);

  const setGroupsContextAndLocalStorage = (groups: Group[]) => {
    setGroups(groups);
    setItem('groups', groups);
  };

  const getAllGroups = async () => {
    if (getItem('groups')) {
      setGroupsContextAndLocalStorage(getItem('groups'));
    } else {
      const groups = await getGroups();
      groups && setGroupsContextAndLocalStorage(groups);
    }
  };

  return {
    groups,
    getAllGroups,
  };
};
