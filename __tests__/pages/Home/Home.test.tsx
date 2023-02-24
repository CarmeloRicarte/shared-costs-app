import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Home } from 'pages/Home';
import * as useCosts from 'pages/Home/hooks/useCosts';
import * as useFriends from 'pages/Home/hooks/useFriends';
import * as useGroups from 'pages/Home/hooks/useGroups';

import { mockCosts, mockFriends, mockGroups } from '../../__fixtures__';

vi.mock('pages/Home/hooks/useCosts');
vi.mock('pages/Home/hooks/useGroups');
vi.mock('pages/Home/hooks/useFriends');

describe('Home component', () => {
  beforeEach(() => {
    (useCosts as any).useCosts = vi.fn().mockReturnValue({
      costs: mockCosts,
      getAllCosts: vi.fn(),
      createCost: vi.fn(),
      isLoading: false,
    });
    (useGroups as any).useGroups = vi.fn().mockReturnValue({
      groups: mockGroups,
      getAllGroups: vi.fn(),
    });

    (useFriends as any).useFriends = vi.fn().mockReturnValue({
      friends: mockFriends,
      getAllFriends: vi.fn(),
      addFriend: vi.fn(),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render the spinner if isLoading costs', () => {
    (useCosts as any).useCosts = vi.fn().mockReturnValue({
      costs: mockCosts,
      getAllCosts: vi.fn(),
      createCost: vi.fn(),

      isLoading: true,
    });
    render(<Home />);
    expect(screen.getByAltText('LoadingSpinner')).toBeInTheDocument();
  });

  test('renders the component with the correct elements', () => {
    render(<Home />);
    expect(screen.getByText('Gastos Compartidos')).toBeInTheDocument();
    expect(screen.getByText('Añadir amigo')).toBeVisible();
    expect(screen.getByText('Añadir pago')).toBeVisible();

    expect(screen.getByText('Gasolina')).toBeInTheDocument();
    expect(screen.getByText('50 €')).toBeInTheDocument();
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('Comida')).toBeInTheDocument();
    expect(screen.getByText('100 €')).toBeInTheDocument();
    expect(screen.getByText('Pedro')).toBeInTheDocument();
  });

  test('opens and closes the "add friend" modal when clicking the button', async () => {
    render(<Home />);

    fireEvent.click(screen.getByText('Añadir amigo'));

    await waitFor(() => {
      expect(screen.getByText('Añadir amigo al grupo')).toBeVisible();
    });

    fireEvent.change(screen.getByTestId('friend-name'), {
      target: { value: 'Juan' },
    });
    fireEvent.change(screen.getByTestId('friend-group'), {
      target: { value: '1' },
    });
    const submitButton = screen.getByRole('button', { name: 'Añadir' });
    fireEvent.submit(submitButton);

    await waitFor(
      () => {
        expect(
          screen.queryByText('Añadir amigo al grupo')
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('opens and closes the "add payment" modal when clicking the button', async () => {
    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: 'Añadir pago' }));

    await waitFor(
      () => {
        const title = screen.getByRole('heading', { level: 3 }).textContent;
        expect(screen.getByRole('heading', { level: 3 })).toBeVisible();
        expect(title).toBe('Añadir pago');
      },
      { timeout: 2000 }
    );

    fireEvent.change(screen.getByLabelText('Descripción:'), {
      target: { value: 'Alquiler' },
    });
    fireEvent.change(screen.getByLabelText('Importe (€):'), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByLabelText('Nombre persona:'), {
      target: { value: 'Pedro' },
    });
    fireEvent.change(screen.getByLabelText('Fecha pago:'), {
      target: { value: '2023-02-16T17:35:00' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Añadir' }));

    await waitFor(
      () => {
        expect(
          screen.queryByRole('heading', { level: 3 })
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
