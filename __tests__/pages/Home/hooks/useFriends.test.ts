import * as useLocalStorage from '@/hooks/useLocalStorage';
import { act, renderHook, waitFor } from '@testing-library/react';
import * as useHomeContext from 'pages/Home/context/HomeContext';
import { useFriends } from 'pages/Home/hooks';

import { Friend } from '../../../../src/pages/Home/models';
import { getFriends } from '../../../../src/pages/Home/services';
import { mockFriends } from '../../../__fixtures__';

vi.mock('pages/Home/services/Friends.service');
vi.mock('pages/Home/context/HomeContext');
vi.mock('@/hooks/useLocalStorage');

describe('useFriends', () => {
  const setFriendsMock = vi.fn();
  const setItemMock = vi.fn();

  beforeEach(() => {
    (useHomeContext as any).useHomeContext = vi.fn().mockReturnValue({
      friends: mockFriends,
      setFriends: setFriendsMock,
    });
  });

  test('should get all friends from API when no data is in local storage', async () => {
    (getFriends as jest.Mock).mockResolvedValueOnce(mockFriends);
    const getItemMock = vi.fn().mockReturnValue(undefined);

    (useLocalStorage as any).useLocalStorage = vi.fn().mockReturnValue({
      setItem: setItemMock,
      getItem: getItemMock,
    });

    const { result } = renderHook(() => useFriends());

    await waitFor(async () => {
      await result.current.getAllFriends();
    });

    expect(setFriendsMock).toHaveBeenCalledWith(mockFriends);
    expect(setItemMock).toHaveBeenCalledWith('friends', mockFriends);
  });

  test('should get all friends from local storage when data is already there', async () => {
    (getFriends as jest.Mock).mockResolvedValueOnce(mockFriends);
    const getItemMock = vi.fn().mockReturnValue(mockFriends);

    (useLocalStorage as any).useLocalStorage = vi.fn().mockReturnValue({
      setItem: setItemMock,
      getItem: getItemMock,
    });

    const { result } = renderHook(() => useFriends());

    await waitFor(async () => {
      await result.current.getAllFriends();
    });
    expect(getItemMock).toHaveBeenCalledWith('friends');
    expect(setFriendsMock).toHaveBeenCalledWith(mockFriends);
    expect(setItemMock).toHaveBeenCalledWith('friends', mockFriends);
  });

  test('should add a new friend and update the local storage and state', () => {
    const newFriend: Friend = {
      id: '3',
      name: 'Carmelo',
      groupId: '1',
    };

    const { result } = renderHook(() => useFriends());

    act(() => {
      result.current.addFriend(newFriend);
    });

    expect(setFriendsMock).toHaveBeenCalledWith([...mockFriends, newFriend]);
    expect(setItemMock).toHaveBeenCalledWith('friends', [
      ...mockFriends,
      newFriend,
    ]);
  });
});
