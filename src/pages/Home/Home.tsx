import { useEffect, useState } from 'react';

import { Modal } from '../../components';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AddFriendForm, AddPaymentForm, BalanceByFriend } from './components';
import { CostsList } from './components/CostsList';
import { useCosts } from './hooks';

export const Home = () => {
  const [isModalAddFriendOpen, setIsModalAddFriendOpen] = useState(false);
  const [isModalAddPaymentOpen, setIsModalAddPaymentOpen] = useState(false);
  const { costs, getAllCosts, isLoading } = useCosts();

  const handleToggleAddFriendModal = () => {
    setIsModalAddFriendOpen(!isModalAddFriendOpen);
  };

  const handleToggleAddPaymentModal = () => {
    setIsModalAddPaymentOpen(!isModalAddPaymentOpen);
  };

  const getCostsData = async () => {
    try {
      await getAllCosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getCostsData();
  }, []);

  return (
    <>
      <h1 className='text-center'>Gastos Compartidos</h1>
      <div className='list-grid-2-columns'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <CostsList
              costs={costs}
              onClickPagoButton={handleToggleAddPaymentModal}
              onClickAmigoButton={handleToggleAddFriendModal}
            />
            <BalanceByFriend />
          </>
        )}
      </div>
      <Modal
        isOpen={isModalAddFriendOpen}
        onClose={handleToggleAddFriendModal}
        headerTitle='Añadir amigo al grupo'
      >
        <AddFriendForm onSubmitForm={handleToggleAddFriendModal} />
      </Modal>
      <Modal
        isOpen={isModalAddPaymentOpen}
        onClose={handleToggleAddPaymentModal}
        headerTitle='Añadir pago'
      >
        <AddPaymentForm onSubmitForm={handleToggleAddPaymentModal} />
      </Modal>
    </>
  );
};
