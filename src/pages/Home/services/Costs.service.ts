import axios from 'axios';

import { Cost } from '../models';

/**
 * It returns a promise that resolves to an array of costs
 * @returns An array of Cost objects.
 */
export const getCosts = async () => {
  try {
    const response = await axios.get<Cost[]>('../data/costs.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
