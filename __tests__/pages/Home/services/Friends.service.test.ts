import axios from 'axios';
import { createFriend, getFriends } from 'pages/Home/services';

import { mockFriends } from '../../../__fixtures__';

vi.mock('axios');
describe('Friends Service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getFriends', () => {
    test('should return an array of friends', async () => {
      (axios.get as any) = vi.fn().mockResolvedValueOnce({ data: mockFriends });
      const friends = await getFriends();

      expect(friends).toEqual(mockFriends);
    });

    test('should handle errors', async () => {
      // Mock the axios.get method to throw an error
      const errorMessage = 'An error occurred';
      (axios.get as any) = vi
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));

      const result = await getFriends();

      // Check that axios.post was called with the correct arguments
      expect(axios.get).toHaveBeenCalled();

      // Check that the result is undefined
      expect(result).toBeUndefined();
    });
  });

  describe('createFriend', () => {
    test('should creeate a friend successfully', async () => {
      // Mock the axios.post method to return a successful response
      (axios.post as any) = vi
        .fn()
        .mockResolvedValueOnce({ data: mockFriends[0] });

      const result = await createFriend(mockFriends[0]);

      // Check that axios.post was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith(
        '/data/friends.json',
        mockFriends[0]
      );

      // Check that the result returns the friend created
      expect(result).toEqual(mockFriends[0]);
    });

    test('should handle errors', async () => {
      // Mock the axios.post method to throw an error
      const errorMessage = 'An error occurred';
      (axios.post as any) = vi
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));

      const result = await createFriend(mockFriends[0]);

      // Check that axios.post was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith(
        '/data/friends.json',
        mockFriends[0]
      );

      // Check that the result is undefined
      expect(result).toBeUndefined();
    });
  });
});
