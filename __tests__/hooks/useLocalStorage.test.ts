import { renderHook } from '@testing-library/react';

import { useLocalStorage } from '../../src/hooks';

describe('useLocalStorage tests', () => {
  test('should set an item in localStorage', () => {
    const { result } = renderHook(useLocalStorage);
    const valueToSet = { a: 4, b: '4' };
    result.current.setItem('test', valueToSet);
    expect(localStorage.getItem('test')).toEqual(JSON.stringify(valueToSet));
  });

  test('should get an item from localStorage', () => {
    const { result } = renderHook(useLocalStorage);
    const valueToSet = { a: 4, b: '4' };
    result.current.setItem('test', valueToSet);
    expect(result.current.getItem('test')).toEqual(valueToSet);
  });
});
