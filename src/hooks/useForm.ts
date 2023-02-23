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
  }: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) => {
    const { name, value, type } = target;
    const newValue =
      type === 'number' && value !== '' ? parseFloat(value) : value;
    setFormState({
      ...formState, // maintain state of other form fields
      [name]: newValue, // update state of field that is changed
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
