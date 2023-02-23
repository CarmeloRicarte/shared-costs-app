import axios from 'axios';
import { addCost, getCosts } from 'pages/Home/services';

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

  describe('addCost', () => {
    test('should add a cost successfully', async () => {
      // Mock the axios.post method to return a successful response
      (axios.post as any) = vi
        .fn()
        .mockResolvedValueOnce({ data: mockCosts[1] });

      const result = await addCost(mockCosts[1]);

      // Check that axios.post was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith('/data/costs.json', mockCosts[1]);

      // Check that the result is true
      expect(result).toBe(true);
    });

    test('should handle errors', async () => {
      // Mock the axios.post method to throw an error
      const errorMessage = 'An error occurred';
      (axios.post as any) = vi
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));

      const result = await addCost(mockCosts[1]);

      // Check that axios.post was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith('/data/costs.json', mockCosts[1]);

      // Check that the result is undefined
      expect(result).toBeUndefined();
    });
  });
});
