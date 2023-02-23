import * as useLocalStorage from '@/hooks/useLocalStorage';
import { renderHook, waitFor } from '@testing-library/react';
import * as useHomeContext from 'pages/Home/context/HomeContext';
import { useGroups } from 'pages/Home/hooks';
import * as getGroups from 'pages/Home/services/Groups.service';

import { mockGroups } from '../../../__fixtures__';

vi.mock('pages/Home/context/HomeContext');
vi.mock('@/hooks/useLocalStorage');
vi.mock('pages/Home/services/Groups.service');

describe('useGroups tests', () => {
  const setGroupsMock = vi.fn();
  const setItemMock = vi.fn();
  const getItemMock = vi.fn().mockReturnValue(mockGroups);
  const getGroupsMock = vi.fn().mockReturnValue(mockGroups);

  beforeEach(() => {
    (useHomeContext as any).useHomeContext = vi.fn().mockReturnValue({
      groups: mockGroups,
      setGroups: setGroupsMock,
    });

    (useLocalStorage as any).useLocalStorage = vi.fn().mockReturnValue({
      setItem: setItemMock,
      getItem: getItemMock,
    });

    (getGroups as any).getGroups = vi.fn().mockReturnValue({
      getGroups: getGroupsMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should call to set groups in context and call to save item in localStorage', async () => {
    const { result } = renderHook(useGroups);
    result.current.setGroupsContextAndLocalStorage(mockGroups);
    await waitFor(() => {
      expect(setGroupsMock).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalledWith('groups', mockGroups);
    });
  });

  test('should call to set groups and call to save in localStorage if exists groups in localStorage', async () => {
    const { result } = renderHook(useGroups);
    await result.current.getAllGroups();
    await waitFor(() => {
      expect(getItemMock).toHaveBeenCalledWith('groups');
      result.current.setGroupsContextAndLocalStorage(mockGroups);
      expect(setGroupsMock).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalledWith('groups', mockGroups);
    });
  });

  test('should get groups from JSON and call to set groups and call to save in localStorage if not exists groups in localStorage', async () => {
    const { result } = renderHook(useGroups);
    await result.current.getAllGroups();
    await waitFor(() => {
      result.current.setGroupsContextAndLocalStorage(mockGroups);
      expect(setGroupsMock).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalledWith('groups', mockGroups);
    });
  });
});
