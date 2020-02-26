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

/**
 * Removes item from localstorage
 */
export const removeItem = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // Ignore errors
  }
};

/**
 * Checks if the saved day id in localStorage is valid (if it can
 * be selected)
 *
 * @param validDayIds {string[]} - List of day ids
 */
export const validateSelectedDayId = validDayIds => {
  // If the saved selected day id is not in the days
  // list ➜ remove it from localStorage
  const savedSelectedDayId = loadItem('selectedDayId');
  if (!savedSelectedDayId) return true;

  const isDayValid = validDayIds.includes(savedSelectedDayId);

  if (!isDayValid) {
    removeItem('selectedDayId');
  }

  return isDayValid;
};
