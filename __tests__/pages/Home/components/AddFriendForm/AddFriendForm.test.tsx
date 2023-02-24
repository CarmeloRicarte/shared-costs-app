import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddFriendForm } from 'pages/Home/components';
import * as useBalances from 'pages/Home/hooks/useBalances';
import * as useFriends from 'pages/Home/hooks/useFriends';
import * as useGroups from 'pages/Home/hooks/useGroups';

import { mockGroups } from '../../../../__fixtures__';

vi.mock('pages/Home/hooks/useGroups');
vi.mock('pages/Home/hooks/useFriends');
vi.mock('pages/Home/hooks/useBalances');

describe('AddFriendForm tests', () => {
  const onSubmitFormMock = vi.fn();
  const addFriendMock = vi.fn();
  const calculateBalanceMock = vi.fn();

  beforeEach(() => {
    (useGroups as any).useGroups = vi.fn().mockReturnValue({
      groups: mockGroups,
    });

    (useFriends as any).useFriends = vi.fn().mockReturnValue({
      addFriend: addFriendMock,
    });

    (useBalances as any).useBalances = vi.fn().mockReturnValue({
      calculateBalance: calculateBalanceMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render component', () => {
    const { container } = render(
      <AddFriendForm onSubmitForm={onSubmitFormMock} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should call to addFriend onSubmit form with a valid friend', async () => {
    render(<AddFriendForm onSubmitForm={onSubmitFormMock} />);
    const nameInput = screen.getByRole('textbox', { name: 'Nombre:' });
    const groupSelect = screen.getByTestId('friend-group');
    const submitButton = screen.getByRole('button', { name: 'Añadir' });

    fireEvent.change(nameInput, { target: { value: 'Carmelo' } });
    fireEvent.change(groupSelect, { target: { value: '1' } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(addFriendMock).toHaveBeenCalledWith({
        id: expect.any(String),
        name: 'Carmelo',
        groupId: '1',
      });
      expect(calculateBalanceMock).toHaveBeenCalled();
    });

    expect(onSubmitFormMock).toHaveBeenCalled();
  });
});
