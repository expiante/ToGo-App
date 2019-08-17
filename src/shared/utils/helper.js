export const sortByField = (arr, field, isDesc) => {
  arr.sort((a, b) => (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0));
  return isDesc ? arr.reverse() : arr;
};

export const duplicate = data => JSON.parse(JSON.stringify(data));

export const filterById = (arr, item) => arr.filter(v => v.id !== item.id);
