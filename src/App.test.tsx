import App from '@/App';
import { render, screen } from '@testing-library/react';

describe('App component', () => {
  describe('The App component should be displayed on the screen', () => {
    test('App renderer', () => {
      render(<App />);

      const title = screen.getByText(/Gastos Compartidos/i);

      expect(title).toBeInTheDocument();
    });
  });
});
