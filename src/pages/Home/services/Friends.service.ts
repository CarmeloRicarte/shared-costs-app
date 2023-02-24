import axios from 'axios';

import { Friend } from '../models';

/**
 * It returns a promise that resolves to an array of friends
 * @returns An array of Friend objects.
 */
export const getFriends = async () => {
  try {
    const response = await axios.get<Friend[]>('/data/friends.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
