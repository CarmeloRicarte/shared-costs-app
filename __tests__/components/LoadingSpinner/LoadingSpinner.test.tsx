import { LoadingSpinner } from '@/components/LoadingSpinner';
import { render } from '@testing-library/react';

describe('LoadingSpinner tests', () => {
  test('should render the spinner', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container).toMatchSnapshot();
  });
});
