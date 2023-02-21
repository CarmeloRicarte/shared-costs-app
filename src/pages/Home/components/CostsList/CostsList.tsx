import './styles/CostsList.css';

import React, { useMemo } from 'react';

import { Cost } from '../../models';
import { CostsListItem } from '../CostsListItem';

interface CostListProps {
  costs: Cost[];
  onClickPagoButton: () => void;
  onClickAmigoButton: () => void;
}

export const CostList: React.FC<CostListProps> = ({
  costs,
  onClickPagoButton,
  onClickAmigoButton,
}) => {
  useMemo(
    () =>
      costs.sort(
        (a, b) =>
          new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
      ),
    [costs]
  );

  return (
    <>
      <ul>
        <div className='costs-list-grid__header'>
          <h2>Listado de gastos</h2>
          <button className='action-button' onClick={onClickPagoButton}>
            Añadir pago
          </button>
          <button className='action-button' onClick={onClickAmigoButton}>
            Añadir amigo
          </button>
        </div>
        {costs.map((cost) => (
          <CostsListItem key={cost.id} cost={cost} />
        ))}
      </ul>
    </>
  );
};
