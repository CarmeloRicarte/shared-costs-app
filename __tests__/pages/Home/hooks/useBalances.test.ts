import * as useLocalStorage from '@/hooks/useLocalStorage';
import { renderHook, waitFor } from '@testing-library/react';
import * as useHomeContext from 'pages/Home/context/HomeContext';
import { useBalances } from 'pages/Home/hooks';
import * as useCosts from 'pages/Home/hooks/useCosts';
import * as useFriends from 'pages/Home/hooks/useFriends';

import { mockBalances, mockCosts, mockFriends } from '../../../__fixtures__';

vi.mock('pages/Home/context/HomeContext');
vi.mock('pages/Home/hooks/useCosts');
vi.mock('pages/Home/hooks/useFriends');
vi.mock('@/hooks/useLocalStorage');

describe('useBalances tests', () => {
  const setBalancesMock = vi.fn();
  const setItemMock = vi.fn();
  const getItemMock = vi.fn().mockReturnValue(mockBalances);

  beforeEach(() => {
    (useHomeContext as any).useHomeContext = vi.fn().mockReturnValue({
      balances: mockBalances,
      setBalances: setBalancesMock,
    });

    (useLocalStorage as any).useLocalStorage = vi.fn().mockReturnValue({
      setItem: setItemMock,
      getItem: getItemMock,
    });

    (useCosts as any).useCosts = vi.fn().mockReturnValue({
      costs: mockCosts,
    });

    (useFriends as any).useFriends = vi.fn().mockReturnValue({
      friends: mockFriends,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should call to set groups in context and call to save item in localStorage', async () => {
    const { result } = renderHook(useBalances);
    result.current.setBalancesContextAndLocalStorage(mockBalances);
    await waitFor(() => {
      expect(setBalancesMock).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalledWith('balances', mockBalances);
    });
  });

  test('should calculate the balance correctly', async () => {
    const { result } = renderHook(useBalances);
    result.current.calculateBalance();
    expect(setBalancesMock).toHaveBeenCalledWith(mockBalances);
  });
});
