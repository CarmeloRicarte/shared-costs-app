/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { act, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';

import { useForm } from '../../src/hooks';

describe('useForm tests', () => {
  const initialForm = {
    name: 'test',
    amount: 0,
  };
  test('should initialize with initial form state', () => {
    const { result } = renderHook(useForm, {
      initialProps: initialForm,
    });
    expect(result).toStrictEqual({
      current: {
        name: initialForm.name,
        amount: initialForm.amount,
        formState: initialForm,
        onInputChange: expect.any(Function),
        onResetForm: expect.any(Function),
      },
    });
  });

  test('should set form state to initial form on reset form', () => {
    const { result } = renderHook(useForm, {
      initialProps: initialForm,
    });
    result.current.amount = 4;
    result.current.onResetForm();
    expect(result.current.formState).toEqual(initialForm);
  });

  test('should update form state on input change', () => {
    const { result } = renderHook(() => useForm(initialForm));
    const inputEvent = {
      target: { name: 'name', value: 'Carmelo', type: 'text' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onInputChange(inputEvent);
    });

    expect(result.current.formState.name).toBe('Carmelo');
  });

  test('should update numeric form state on input change', () => {
    const { result } = renderHook(() => useForm(initialForm));
    const inputEvent = {
      target: { name: 'amount', value: '20', type: 'number' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onInputChange(inputEvent);
    });

    expect(result.current.formState.amount).toBe(20);
  });
});
