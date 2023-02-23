import './styles/CostsList.css';

import React, { useMemo } from 'react';

import { Cost } from '../../models';
import { CostsListItem } from '../CostsListItem';

interface CostsListProps {
  costs: Cost[];
  onClickPagoButton: () => void;
  onClickAmigoButton: () => void;
}

export const CostsList: React.FC<CostsListProps> = ({
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
    <section className='default-section'>
      <ul className='costs-list'>
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
    </section>
  );
};
