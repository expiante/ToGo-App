import { mockData } from 'config/consts';

export const getStorageData = (field = 'data') => {
  return JSON.parse(localStorage.getItem(field));
};

export const setStorageData = (data, field = 'data') => {
  localStorage.setItem(field, JSON.stringify(data));
};

export const initializeStorageData = (data = mockData, field = 'data') => {
  setStorageData(data, field);
};
