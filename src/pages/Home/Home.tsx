import { useEffect } from 'react';

import { CustomTable } from '../../components';
import { getLocaleDateString } from '../../utilities';
import { useHomeContext } from './context';
import { getCosts } from './services/Costs.service';

const tableHeaders = [
  { key: 'personName', header: 'Nombre' },
  {
    key: 'totalAmount',
    header: 'Importe del pago',
    render: (value: number) => <>{`${value} €`}</>,
  },
  { key: 'description', header: 'Descripción' },
  {
    key: 'paymentDate',
    header: 'Fecha del pago',
    render: (value: string) => <>{getLocaleDateString(value)}</>,
  },
];

const actions = [
  {
    label: 'Añadir amigo',
    onClick: () => {
      console.log('abrir añadir amigo');
    },
  },
  {
    label: 'Añadir pago',
    onClick: () => {
      console.log('abrir añadir pago');
    },
  },
];

export const Home = () => {
  const { costs, setCosts } = useHomeContext();
  const getCostData = async () => {
    try {
      const data = await getCosts();
      if (data != null) {
        setCosts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getCostData();
  }, []);

  return (
    <div>
      <h1>Gastos Compartidos</h1>
      <CustomTable
        data={costs}
        columns={tableHeaders}
        perPage={5}
        actions={actions}
      />
    </div>
  );
};
