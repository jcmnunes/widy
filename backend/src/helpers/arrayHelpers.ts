/**
 * Moves an item from index `fromIndex` to index `toIndex`
 * in array `arr`.
 */
export const move = <T>(arr: T[], fromIndex: number, toIndex: number) => {
  const element = arr[fromIndex];
  const newArr = [...arr];
  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, element);
  return newArr;
};

/**
 * Removes an item at index from an array
 */
export const remove = <T>(arr: T[], index: number) => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};

/**
 * Inserts an item at index in an array
 */
export const insert = <T>(arr: T[], index: number, element: T) => {
  const newArr = [...arr];
  newArr.splice(index, 0, element);
  return newArr;
};
