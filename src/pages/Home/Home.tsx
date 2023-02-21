import { useEffect, useState } from 'react';

import { Modal } from '../../components';
import { AddFriendForm, BalanceByFriend } from './components';
import { CostList } from './components/CostsList';
import { useHomeContext } from './context';
import { getFriends, getGroups } from './services';
import { getCosts } from './services/Costs.service';

export const Home = () => {
  const { costs, setCosts, setFriends, setGroups } = useHomeContext();
  const [isModalAddFriendOpen, setIsModalAddFriendOpen] = useState(false);
  const [isModalAddPaymentOpen, setIsModalAddPaymentOpen] = useState(false);

  const handleToggleAddFriendModal = () => {
    setIsModalAddFriendOpen(!isModalAddFriendOpen);
  };

  const handleToggleAddPaymentModal = () => {
    setIsModalAddPaymentOpen(!isModalAddPaymentOpen);
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

  const getFriendsData = async () => {
    try {
      const friends = await getFriends();
      if (friends != null) {
        setFriends(friends);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getGroupsData = async () => {
    try {
      const groups = await getGroups();
      if (groups != null) {
        setGroups(groups);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getCostData();
  }, []);

  useEffect(() => {
    void getFriendsData();
  }, []);

  useEffect(() => {
    void getGroupsData();
  }, []);

  return (
    <>
      <h1 className='text-center'>Gastos Compartidos</h1>
      <div className='list-grid-2-columns'>
        <CostList
          costs={costs}
          onClickPagoButton={handleToggleAddPaymentModal}
          onClickAmigoButton={handleToggleAddFriendModal}
        />
        <BalanceByFriend />
      </div>
      <Modal
        isOpen={isModalAddFriendOpen}
        onClose={handleToggleAddFriendModal}
        headerTitle='Añadir amigo al grupo'
      >
        <AddFriendForm onSubmitForm={handleToggleAddFriendModal} />
      </Modal>
    </>
  );
};
