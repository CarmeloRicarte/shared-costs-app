import { useState } from 'react';

import { useLocalStorage } from '../../../hooks';
import { useHomeContext } from '../context';
import { Cost } from '../models';
import { getCosts } from '../services';

export const useCosts = () => {
  const { costs, setCosts } = useHomeContext();
  const { setItem, getItem } = useLocalStorage();
  const [isLoading, setisLoading] = useState(false);

  const setCostsContextAndLocalStorage = (costs: Cost[]) => {
    setCosts(costs);
    setItem('costs', costs);
  };

  const getAllCosts = async () => {
    setisLoading(true);
    if (getItem('costs')) {
      setCostsContextAndLocalStorage(getItem('costs'));
    } else {
      const costs = await getCosts();
      costs && setCostsContextAndLocalStorage(costs);
    }
    setisLoading(false);
  };

  const createCost = (cost: Cost) => {
    const newCosts = [...costs, cost];
    setCostsContextAndLocalStorage(newCosts);
  };

  return {
    costs,
    getAllCosts,
    createCost,
    setCostsContextAndLocalStorage,
    isLoading,
  };
};
