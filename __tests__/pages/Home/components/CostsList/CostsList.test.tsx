import { fireEvent, render, screen } from '@testing-library/react';
import { CostsList } from 'pages/Home/components';

import { mockCosts } from '../../../../__fixtures__';

describe('CostsList tests', () => {
  const onClickAmigoButtonMock = vi.fn();
  const onClickPagoButtonMock = vi.fn();

  test('should render the costs list', () => {
    const { container } = render(
      <CostsList
        costs={mockCosts}
        onClickAmigoButton={onClickAmigoButtonMock}
        onClickPagoButton={onClickPagoButtonMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should call to onClickPagoButton on click button "Añadir pago"', () => {
    render(
      <CostsList
        costs={mockCosts}
        onClickAmigoButton={onClickAmigoButtonMock}
        onClickPagoButton={onClickPagoButtonMock}
      />
    );

    const button = screen.getByRole('button', { name: 'Añadir pago' });
    fireEvent.click(button);
    expect(onClickPagoButtonMock).toHaveBeenCalled();
  });

  test('should call to onClickAmigoButton on click button "Añadir amigo"', () => {
    render(
      <CostsList
        costs={mockCosts}
        onClickAmigoButton={onClickAmigoButtonMock}
        onClickPagoButton={onClickPagoButtonMock}
      />
    );

    const button = screen.getByRole('button', { name: 'Añadir amigo' });
    fireEvent.click(button);
    expect(onClickAmigoButtonMock).toHaveBeenCalled();
  });
});
