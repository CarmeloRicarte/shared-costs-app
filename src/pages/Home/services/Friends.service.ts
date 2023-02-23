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

/**
 * It takes a friend object, sends it to the server, and returns the response
 * @param {Friend} friend - Friend - this is the friend object that we're passing in.
 * @returns The response.data is being returned.
 */
export const createFriend = async (friend: Friend) => {
  try {
    const response = await axios.post('/data/friends.json', friend);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
