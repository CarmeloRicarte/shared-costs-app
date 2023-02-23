import { useLocalStorage } from '../../../hooks';
import { useHomeContext } from '../context';
import { Cost } from '../models';
import { getCosts } from '../services';
import { addCost } from '../services/Costs.service';

export const useCosts = () => {
  const { costs, setCosts } = useHomeContext();
  const { setItem, getItem } = useLocalStorage();

  const setCostsContextAndLocalStorage = (costs: Cost[]) => {
    setCosts(costs);
    setItem('costs', costs);
  };

  const getAllCosts = async () => {
    if (getItem('costs')) {
      setCostsContextAndLocalStorage(getItem('costs'));
    } else {
      const costs = await getCosts();
      costs && setCostsContextAndLocalStorage(costs);
    }
  };

  const createCost = async (cost: Cost) => {
    const createdCost = await addCost(cost);
    if (createdCost) {
      const newCosts = [...costs, cost];
      setCostsContextAndLocalStorage(newCosts);
    }
  };

  return {
    costs,
    getAllCosts,
    createCost,
  };
};
