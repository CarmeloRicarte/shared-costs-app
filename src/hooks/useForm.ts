import { ChangeEvent, useEffect, useState } from 'react';

export const useForm = <T extends object>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);

  useEffect(() => {
    setFormState(initialForm);
  }, []);

  /**
   * When the input changes, update the state of the form with the new value of the input.
   */
  const onInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState, // maintain state of other form fields
      [name]: value, // update state of field that is changed
    });
  };

  /**
   * It resets the form to its initial state.
   */
  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState, // for return every form control of state
    formState,
    onInputChange,
    onResetForm,
  };
};