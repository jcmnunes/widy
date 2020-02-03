/**
 * Moves an item from index `fromIndex` to index `toIndex`
 * in array `arr`.
 *
 * @param {Array} arr - Array to reorder
 * @param {number} fromIndex - Initial index of the element
 * @param {number} toIndex - Final index of the element
 *
 * @return {Array} - Reordered copy of the initial array
 */
exports.move = (arr, fromIndex, toIndex) => {
  const element = arr[fromIndex];
  const newArr = [...arr];
  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, element);
  return newArr;
};

/**
 * Removes an item at index from an array
 *
 * @param {Array} arr - Original array
 * @param {number} index - Index of the element to remove
 *
 * @returns {Array} - A new copy of the original array without the element at index
 */
exports.remove = (arr, index) => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};

/**
 * Inserts an item at index in an array
 *
 * @param {Array} arr - Original array
 * @param {number} index - Index of the new element to insert
 * @param {any} element - New element to insert
 *
 * @returns {Array} - A new copy of the original array with the new element
 */
exports.insert = (arr, index, element) => {
  const newArr = [...arr];
  newArr.splice(index, 0, element);
  return newArr;
};
