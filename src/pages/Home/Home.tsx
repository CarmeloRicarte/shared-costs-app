import { useEffect, useState } from 'react';

import { Modal } from '../../components';
import { CostList } from './components/CostsList';
import { useHomeContext } from './context';
import { getCosts } from './services/Costs.service';

export const Home = () => {
  const { costs, setCosts } = useHomeContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* const handleOpenModal = () => {
    setIsModalOpen(true);
  }; */

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
      <h1 className='text-center'>Gastos Compartidos</h1>
      <CostList costs={costs} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* TODO: PASAR EL COMPONENTE DE FORMULARIO */}
      </Modal>
    </div>
  );
};
