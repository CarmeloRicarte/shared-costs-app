import axios from 'axios';
import { getFriends } from 'pages/Home/services';

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
});
