import axios from 'axios';
import { getGroups } from 'pages/Home/services';

import { mockGroups } from '../../../__fixtures__';

vi.mock('axios');
describe('Groups Service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getGroups', () => {
    test('should return an array of groups', async () => {
      (axios.get as any) = vi.fn().mockResolvedValueOnce({ data: mockGroups });
      const groups = await getGroups();

      expect(groups).toEqual(mockGroups);
    });

    test('should handle errors', async () => {
      // Mock the axios.get method to throw an error
      const errorMessage = 'An error occurred';
      (axios.get as any) = vi
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));

      const result = await getGroups();

      // Check that axios.post was called with the correct arguments
      expect(axios.get).toHaveBeenCalled();

      // Check that the result is undefined
      expect(result).toBeUndefined();
    });
  });
});
