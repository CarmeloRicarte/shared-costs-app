import './styles/AddPaymentForm.css';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useForm } from '../../../../hooks';
import { useBalances, useCosts, useFriends } from '../../hooks';

export interface AddPaymentFormProps {
  onSubmitForm: () => void;
}

const initialState = {
  personName: '',
  totalAmount: 0,
  description: '',
  paymentDate: '',
};

export const AddPaymentForm: React.FC<AddPaymentFormProps> = ({
  onSubmitForm,
}) => {
  const { createCost } = useCosts();
  const { friends } = useFriends();
  const { calculateBalance } = useBalances();
  const {
    formState,
    personName,
    totalAmount,
    description,
    paymentDate,
    onInputChange,
  } = useForm(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCost({
      id: uuidv4(),
      personName,
      totalAmount,
      description,
      paymentDate,
    });
    calculateBalance();
    onSubmitForm();
  };

  return (
    <form className='payment-group-form' onSubmit={handleSubmit}>
      <div className='container'>
        <div className='row'>
          <div className='col-2'>
            <label htmlFor='personName' className='payment-group-form-label'>
              Nombre persona:
            </label>
          </div>
          <div className='col-4'>
            <select
              data-testid='personName'
              id='personName'
              name='personName'
              value={personName}
              className='payment-group-form-select'
              onChange={onInputChange}
              required
            >
              <option key={0} value={''}>
                Seleccione
              </option>
              {friends.map((friend) => (
                <option key={friend.id} value={friend.name}>
                  {friend.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-2'>
            <label htmlFor='description' className='payment-group-form-label'>
              Descripci??n:
            </label>
          </div>
          <div className='col-4'>
            <textarea
              data-testid='description'
              id='description'
              className='payment-group-form-input'
              name='description'
              value={description}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label htmlFor='totalAmount' className='payment-group-form-label'>
              Importe (???):
            </label>
          </div>
          <div className='col-4'>
            <input
              data-testid='totalAmount'
              id='totalAmount'
              type='number'
              min={0.01}
              step='any'
              className='payment-group-form-input'
              name='totalAmount'
              value={totalAmount}
              onChange={onInputChange}
              placeholder='0,00 ???'
              required
            />
          </div>
          <div className='col-2'>
            <label htmlFor='paymentDate' className='payment-group-form-label'>
              Fecha pago:
            </label>
          </div>
          <div className='col-4'>
            <input
              data-testid='paymentDate'
              id='paymentDate'
              type='datetime-local'
              className='payment-group-form-input'
              name='paymentDate'
              value={paymentDate}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-1 col-offset-11 text-end'>
            <button
              id='addFriendButton'
              className='payment-group-form-button'
              type='submit'
              disabled={Object.entries(formState).some(
                (formControl) => formControl[1] === '' || formControl[1] === 0
              )}
            >
              A??adir
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
