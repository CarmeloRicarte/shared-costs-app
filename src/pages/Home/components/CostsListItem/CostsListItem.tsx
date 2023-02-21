import './styles/CostsListItem.css';

import React from 'react';

import { getLocaleDateString } from '../../../../utilities';
import { Cost } from '../../models';

export interface CostsListItemInterface {
  cost: Cost;
}

export const CostsListItem: React.FC<CostsListItemInterface> = ({ cost }) => {
  return (
    <li>
      <div className='costs-list-grid__item'>
        <div>
          <p className='costs-list-grid__personName'>{cost.personName}</p>
          <p className='costs-list-grid__description'>{cost.description}</p>
        </div>
        <div className='text-end'>
          <p className='costs-list-grid__totalAmount'>{cost.totalAmount} €</p>
          <p className='costs-list-grid__paymentDate'>
            {getLocaleDateString(cost.paymentDate)}
          </p>
        </div>
      </div>
    </li>
  );
};
