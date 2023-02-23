import axios from 'axios';

import { Cost } from '../models';

/**
 * It returns a promise that resolves to an array of costs
 * @returns An array of Cost objects.
 */
export const getCosts = async () => {
  try {
    const response = await axios.get<Cost[]>('/data/costs.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * It sends a POST request to the JSON file with the cost object as the body
 * @param {Cost} cost - Cost - this is the cost object that we're sending to the server.
 * @returns A promise that resolves to true if the request is successful, or rejects with an error if
 * the request fails.
 */
export const addCost = async (cost: Cost) => {
  try {
    await axios.post('/data/costs.json', cost);
    return true;
  } catch (error) {
    console.error(error);
  }
};
