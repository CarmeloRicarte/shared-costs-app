import { act, renderHook } from '@testing-library/react';
import { HomeProvider, useHomeContext } from 'pages/Home/context';

describe('HomeContext tests', () => {
  test('should provide the initial state', () => {
    const { result } = renderHook(() => useHomeContext(), {
      wrapper: HomeProvider,
    });

    expect(result.current.costs).toEqual([]);
    expect(result.current.friends).toEqual([]);
    expect(result.current.groups).toEqual([]);
    expect(result.current.balances).toEqual([]);
  });

  test('should update the costs state', () => {
    const { result } = renderHook(() => useHomeContext(), {
      wrapper: HomeProvider,
    });

    const newCosts = [
      {
        id: '1',
        personName: 'Andreu',
        totalAmount: 10,
        description: 'Desayuno',
        paymentDate: '2023-02-17T21:00:00',
      },
    ];
    act(() => {
      result.current.setCosts(newCosts);
    });

    expect(result.current.costs).toEqual(newCosts);
  });

  test('should update the friends state', () => {
    const { result } = renderHook(() => useHomeContext(), {
      wrapper: HomeProvider,
    });

    const newFriends = [
      {
        id: '1',
        name: 'Carmelo',
        groupId: '1',
      },
    ];

    act(() => {
      result.current.setFriends(newFriends);
    });

    expect(result.current.friends).toEqual(newFriends);
  });

  test('should update the groups state', () => {
    const { result } = renderHook(() => useHomeContext(), {
      wrapper: HomeProvider,
    });

    const newGroups = [{ id: '1', name: 'Grupo 1' }];

    act(() => {
      result.current.setGroups(newGroups);
    });

    expect(result.current.groups).toEqual(newGroups);
  });

  test('should update the balances state', () => {
    const { result } = renderHook(() => useHomeContext(), {
      wrapper: HomeProvider,
    });

    const newBalances = [{ friendName: 'Ana', balance: 10 }];

    act(() => {
      result.current.setBalances(newBalances);
    });

    expect(result.current.balances).toEqual(newBalances);
  });
});
