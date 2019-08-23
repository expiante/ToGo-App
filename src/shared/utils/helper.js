export const sortBy = (arr, field, isDesc) => {
  arr.sort((a, b) =>
    (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0));
  return isDesc ? arr.reverse() : arr;
};

export const filterBy = (arr, text) => {
  const regexp = new RegExp(text.replace(' ', ''), 'gi')
  return arr.filter(item => item.text.replace(' ', '').match(regexp));
};

export const duplicate = data =>
  JSON.parse(JSON.stringify(data));

export const filterById = (arr, item) =>
  arr.filter(v => v.id !== item.id);

export const getEnumArrFrom = (val) =>
  Array.from(Array(val).fill(1).map((x, k) => k + 1));
