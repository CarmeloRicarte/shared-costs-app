/**
 * It takes a date as a string or number and returns a locale date string
 * @param {string | number} date - The date to be formatted.
 * @returns A string that represents the date in the local timezone.
 */
export const getLocaleDateString = (date: string | number): string => {
  return new Date(date).toLocaleString();
};
