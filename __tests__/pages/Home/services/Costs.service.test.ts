import axios from 'axios';
import { getCosts } from 'pages/Home/services';

import { mockCosts } from '../../../__fixtures__';

vi.mock('axios');
describe('Costs Service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getCosts', () => {
    test('should return an array of costs', async () => {
      (axios.get as any) = vi.fn().mockResolvedValueOnce({ data: mockCosts });
      const costs = await getCosts();

      expect(costs).toEqual(mockCosts);
    });

    test('should handle errors', async () => {
      // Mock the axios.get method to throw an error
      const errorMessage = 'An error occurred';
      (axios.get as any) = vi
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));

      const result = await getCosts();

      // Check that axios.post was called with the correct arguments
      expect(axios.get).toHaveBeenCalled();

      // Check that the result is undefined
      expect(result).toBeUndefined();
    });
  });
});
