/**
 * Reads the localStorage value for the item key passed as argument.
 *
 * @return Returns the parsed value from localStorage if such value exists, or
 * null otherwise.
 */
export const loadItem = key => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (err) {
    return null;
  }
};

/**
 * Writes the passed value to localStorage, with the key passed as argument.
 */
export const saveItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (err) {
    // Ignore errors
  }
};
