import './styles/AddPaymentForm.css';

import React from 'react';

import { useForm } from '../../../../hooks';
import { useHomeContext } from '../../context';

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
  const { friends } = useHomeContext();
  const {
    formState,
    personName,
    totalAmount,
    description,
    paymentDate,
    onInputChange,
  } = useForm(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: añadir el pago al state y escribirlo en el json de amigos
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
              Descripción:
            </label>
          </div>
          <div className='col-4'>
            <textarea
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
              Importe (€):
            </label>
          </div>
          <div className='col-4'>
            <input
              id='totalAmount'
              type='number'
              min={0.01}
              className='payment-group-form-input'
              name='totalAmount'
              value={totalAmount}
              onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                e.currentTarget.value =
                  e.currentTarget.valueAsNumber.toFixed(2);
              }}
              onChange={onInputChange}
              placeholder='0.00 €'
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
              Añadir
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};