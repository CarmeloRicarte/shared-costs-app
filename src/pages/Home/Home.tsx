import { useEffect, useState } from 'react';

import { CustomTable, Modal } from '../../components';
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

export const Home = () => {
  const { costs, setCosts } = useHomeContext();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const actions = [
    {
      label: 'Añadir amigo',
      onClick: () => {
        handleOpenModal();
      },
    },
    {
      label: 'Añadir pago',
      onClick: () => {
        handleOpenModal();
      },
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* TODO: PASAR EL COMPONENTE DE FORMULARIO */}
      </Modal>
    </div>
  );
};
