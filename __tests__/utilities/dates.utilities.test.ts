import { getLocaleDateString } from '../../src/utilities';

describe('Dates Utilities', () => {
  test('should returns a locale date string passing a date as a string', () => {
    const dateString = '2023-02-17T21:00:00';
    const formattedDate = getLocaleDateString(dateString);
    expect(formattedDate).toBe('17/2/2023, 21:00:00');
  });

  test('should returns a locale date string passing a date as a number', () => {
    const dateNumber = 1676664000000;
    const formattedDate = getLocaleDateString(dateNumber);
    expect(formattedDate).toBe('17/2/2023, 21:00:00');
  });
});
