import { render, screen } from '@testing-library/react';

import { Home } from '../../../src/pages/Home';

describe('Home component', () => {
  describe('The home component should be displayed on the screen', () => {
    test('Home renderer', () => {
      render(<Home />);

      const title = screen.getByText(/Gastos Compartidos/i);

      expect(title).toBeInTheDocument();
    });
  });
});
