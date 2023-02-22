export const useLocalStorage = () => {
  /**
   * It gets an item from localStorage, parses it, and returns it
   * @param {string} key - string - The key of the item you want to get from localStorage.
   * @param {any} value - any - This is the value you want to store in localStorage.
   */
  const setItem = (key: string, value: any) => {
    const valueToString = JSON.stringify(value);
    localStorage.setItem(key, valueToString);
  };

  /**
   * It gets an item from localStorage, parses it, and returns it
   * @param {string} key - The key of the item you want to get from localStorage.
   * @returns The value of the key in localStorage.
   */
  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
  };

  return {
    setItem,
    getItem,
  };
};
