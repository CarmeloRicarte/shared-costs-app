import { render, screen } from '@testing-library/react';
import { BalanceByFriend } from 'pages/Home/components';
import * as useBalances from 'pages/Home/hooks/useBalances';
import * as useCosts from 'pages/Home/hooks/useCosts';

import { mockBalances, mockCosts } from '../../../__fixtures__';

vi.mock('pages/Home/hooks/useCosts');
vi.mock('pages/Home/hooks/useBalances');

describe('BalanceByFriends tests', () => {
  beforeEach(() => {
    (useCosts as any).useCosts = vi.fn().mockReturnValue({
      costs: mockCosts,
    });
    (useBalances as any).useBalances = vi.fn().mockReturnValue({
      balances: mockBalances,
      calculateBalance: vi.fn(),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render the balance list', () => {
    render(<BalanceByFriend />);
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('-50.00 €')).toBeInTheDocument();
  });

  test('should show the balance in red color if it is negative', () => {
    render(<BalanceByFriend />);
    expect(screen.getByText('-50.00 €').className).toContain('text-red');
  });

  test('should show the balance in green color if it is positive', () => {
    render(<BalanceByFriend />);
    expect(screen.getByText('50.00 €').className).toContain('text-green');
  });
});
