import './styles/AddFriendForm.css';

import React from 'react';

import { useForm } from '../../../../hooks';
import { useHomeContext } from '../../context';

export interface AddFriendFormProps {
  onSubmitForm: () => void;
}

const initialState = {
  name: '',
  groupId: '',
};

export const AddFriendForm: React.FC<AddFriendFormProps> = ({
  onSubmitForm,
}) => {
  const { groups } = useHomeContext();
  const { formState, name, groupId, onInputChange } = useForm(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: añadir el amigo al state y escribirlo en el json de amigos
    onSubmitForm();
  };

  return (
    <form className='friend-group-form' onSubmit={handleSubmit}>
      <div className='friend-group-form-row'>
        <label htmlFor='name' className='friend-group-form-label'>
          Nombre:
        </label>
        <input
          id='name'
          type='text'
          className='friend-group-form-input'
          name='name'
          value={name}
          onChange={onInputChange}
          required
        />
      </div>

      <div className='friend-group-form-row'>
        <label htmlFor='groupId' className='friend-group-form-label'>
          Grupo:
        </label>
        <select
          id='groupId'
          name='groupId'
          value={groupId}
          className='friend-group-form-select'
          onChange={onInputChange}
          required
        >
          <option key={0} value={''}>
            Seleccione
          </option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <button
        id='addFriendButton'
        className='friend-group-form-button'
        type='submit'
        disabled={Object.entries(formState).some(
          (formControl) => formControl[1] === ''
        )}
      >
        Añadir
      </button>
    </form>
  );
};
