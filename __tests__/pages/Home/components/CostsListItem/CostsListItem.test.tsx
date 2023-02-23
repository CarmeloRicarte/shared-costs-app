import { render } from '@testing-library/react';
import { CostsListItem } from 'pages/Home/components';

import { mockCosts } from '../../../../__fixtures__';

describe('CostsList tests', () => {
  test('should render the costs list', () => {
    const { container } = render(<CostsListItem cost={mockCosts[0]} />);

    expect(container).toMatchSnapshot();
  });
});
