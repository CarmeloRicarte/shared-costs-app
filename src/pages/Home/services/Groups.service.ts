import axios from 'axios';

import { Group } from '../models';

/**
 * It returns a promise that resolves to an array of groups
 * @returns An array of Group objects.
 */
export const getGroups = async () => {
  try {
    const response = await axios.get<Group[]>('/data/groups.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
