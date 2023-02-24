import * as useLocalStorage from '@/hooks/useLocalStorage';
import { act, renderHook, waitFor } from '@testing-library/react';
import * as useHomeContext from 'pages/Home/context/HomeContext';
import { useCosts } from 'pages/Home/hooks';

import { Cost } from '../../../../src/pages/Home/models';
import { addCost, getCosts } from '../../../../src/pages/Home/services';
import { mockCosts } from '../../../__fixtures__/costs.fixtures';

vi.mock('pages/Home/services/Costs.service');
vi.mock('pages/Home/context/HomeContext');
vi.mock('@/hooks/useLocalStorage');

describe('useCosts', () => {
  const setCostsMock = vi.fn();
  const setItemMock = vi.fn();

  beforeEach(() => {
    (useHomeContext as any).useHomeContext = vi.fn().mockReturnValue({
      costs: mockCosts,
      setCosts: setCostsMock,
    });
  });

  test('should get all costs from API when no data is in local storage', async () => {
    (getCosts as jest.Mock).mockResolvedValueOnce(mockCosts);
    const getItemMock = vi.fn().mockReturnValue(undefined);

    (useLocalStorage as any).useLocalStorage = vi.fn().mockReturnValue({
      setItem: setItemMock,
      getItem: getItemMock,
    });

    const { result } = renderHook(() => useCosts());

    await waitFor(async () => {
      await result.current.getAllCosts();
    });

    expect(setCostsMock).toHaveBeenCalledWith(mockCosts);
    expect(setItemMock).toHaveBeenCalledWith('costs', mockCosts);
  });

  test('should get all costs from local storage when data is already there', async () => {
    (getCosts as jest.Mock).mockResolvedValueOnce(mockCosts);
    const getItemMock = vi.fn().mockReturnValue(mockCosts);

    (useLocalStorage as any).useLocalStorage = vi.fn().mockReturnValue({
      setItem: setItemMock,
      getItem: getItemMock,
    });

    const { result } = renderHook(() => useCosts());

    await waitFor(async () => {
      await result.current.getAllCosts();
    });
    expect(getItemMock).toHaveBeenCalledWith('costs');
    expect(setCostsMock).toHaveBeenCalledWith(mockCosts);
    expect(setItemMock).toHaveBeenCalledWith('costs', mockCosts);
  });

  test('should add a new cost and update the local storage and state', async () => {
    const newCost: Cost = {
      id: '3',
      personName: 'Andreu',
      totalAmount: 10,
      description: 'Desayuno',
      paymentDate: '2023-02-17T21:00:00',
    };

    (addCost as jest.Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useCosts());

    await act(async () => {
      await result.current.createCost(newCost);
    });

    expect(addCost).toHaveBeenCalledWith(newCost);
    expect(setCostsMock).toHaveBeenCalledWith([...mockCosts, newCost]);
    expect(setItemMock).toHaveBeenCalledWith('costs', [...mockCosts, newCost]);
  });
});
