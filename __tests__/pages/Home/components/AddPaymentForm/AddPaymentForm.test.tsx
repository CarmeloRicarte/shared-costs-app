import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddPaymentForm } from 'pages/Home/components';
import * as useBalances from 'pages/Home/hooks/useBalances';
import * as useCosts from 'pages/Home/hooks/useCosts';
import * as useFriends from 'pages/Home/hooks/useFriends';

import { mockFriends } from '../../../../__fixtures__';

vi.mock('pages/Home/hooks/useCosts');
vi.mock('pages/Home/hooks/useFriends');
vi.mock('pages/Home/hooks/useBalances');

describe('AddFriendForm tests', () => {
  const onSubmitFormMock = vi.fn();
  const createCostMock = vi.fn();
  const calculateBalanceMock = vi.fn();

  beforeEach(() => {
    (useCosts as any).useCosts = vi.fn().mockReturnValue({
      createCost: createCostMock,
    });

    (useFriends as any).useFriends = vi.fn().mockReturnValue({
      friends: mockFriends,
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
      <AddPaymentForm onSubmitForm={onSubmitFormMock} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should call to createCost onSubmit form with a valid payment', async () => {
    render(<AddPaymentForm onSubmitForm={onSubmitFormMock} />);
    const personNameSelect = screen.getByTestId('personName');
    const descriptionInput = screen.getByTestId('description');
    const totalAmountInput = screen.getByTestId('totalAmount');
    const paymentDateInput = screen.getByTestId('paymentDate');

    const submitButton = screen.getByRole('button', { name: 'Añadir' });
    fireEvent.change(personNameSelect, { target: { value: 'Pedro' } });
    fireEvent.change(descriptionInput, { target: { value: 'test' } });
    fireEvent.change(totalAmountInput, { target: { value: '4.50' } });
    fireEvent.change(paymentDateInput, {
      target: { value: '2023-02-18T22:00:00' },
    });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(createCostMock).toHaveBeenCalledWith({
        id: expect.any(String),
        personName: 'Pedro',
        description: 'test',
        totalAmount: 4.5,
        paymentDate: '2023-02-18T22:00',
      });
    });
    expect(calculateBalanceMock).toHaveBeenCalled();
    expect(onSubmitFormMock).toHaveBeenCalled();
  });
});
