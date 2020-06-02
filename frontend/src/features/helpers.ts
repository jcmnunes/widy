export const arrayInsert = <T>(arr: T[], index: number, element: T) => {
  const newArr = [...arr];
  newArr.splice(index, 0, element);
  return newArr;
};

export const arrayRemove = <T>(arr: T[], index: number) => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};
