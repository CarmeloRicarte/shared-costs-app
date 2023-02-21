import './styles/CostsList.css';

import React, { useMemo } from 'react';

import { Cost } from '../../models';
import { CostsListItem } from '../CostsListItem';

interface CostListProps {
  costs: Cost[];
}

export const CostList: React.FC<CostListProps> = ({ costs }) => {
  useMemo(
    () =>
      costs.sort(
        (a, b) =>
          new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
      ),
    [costs]
  );

  return (
    <div>
      <div className='costs-list-grid'>
        <ul>
          <div className='costs-list-grid__header'>
            <h2>Listado de gastos</h2>
            <button className='action-button'>Añadir pago</button>
            <button className='action-button'>Añadir amigo</button>
          </div>
          {costs.map((cost) => (
            <CostsListItem key={cost.id} cost={cost} />
          ))}
        </ul>
      </div>
    </div>
  );
};
