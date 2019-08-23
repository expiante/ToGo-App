import { filterById, sortBy } from 'shared/utils/helper';

export const getStorageData = (field = 'data') => {
  return JSON.parse(localStorage.getItem(field));
};

export const setStorageData = (data, field = 'data') => {
  localStorage.setItem(field, JSON.stringify(data));
};

export const updateStorageData = (item) => {
  const filteredData = filterById(getStorageData('data'), item)
  const sortedData = sortBy([...filteredData, item], 'id');
  setStorageData(sortedData);
}

export const removeStorageData = (item) => {
  const filteredData = filterById(getStorageData('data'), item)
  setStorageData(filteredData);
}