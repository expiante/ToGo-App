import {
  getStorageData,
  setStorageData,
  updateStorageData,
  removeStorageData,
} from 'shared/utils/storage';
import { sortBy, duplicate, filterBy, filterById } from 'shared/utils/helper';
import { mapConfig, mockData, MSG, MSG_TYPE } from 'config/consts';

const {
  LOCATION_VISIT_ENABLED,
  LOCATION_VISIT_DISABLED,
  LOCATION_UPDATE_DONE,
  LOCATION_CREATE_DONE,
  LOCATION_REMOVE_DONE,
} = MSG;
const { SUCCESS } = MSG_TYPE;
const { url, key, ver, libs, defaultPosition } = mapConfig;

const initializeMap = dispatch => {
  const fullURL = `${url}?key=${key}&v=${ver}&libraries=${libs.join(',')}`;
  dispatch(fullURL);
};

const initializeData = dispatch => {
  if (!getStorageData('data')) setStorageData(mockData, 'data');
  dispatch(getStorageData('data'));
};

export const initializeView = (mapDispatcher, dataDispatcher) => {
  initializeMap(mapDispatcher);
  initializeData(dataDispatcher);
};

export const filterData = (dispatch, value) => dispatch(filterBy(getStorageData('data'), value));

export const createOrUpdateStorageItem = (
  item,
  location,
  position,
  searchValue,
  enqueue,
  dispatch,
) => {
  const storageData = getStorageData('data');
  if (location) {
    const filteredData = storageData.filter(v => v.id !== item.id);
    setStorageData(sortBy([...filteredData, item], 'id'));
  } else {
    const newItem = {
      ...position,
      ...item,
      id: storageData.length + 1,
      visited: false,
    };
    setStorageData(sortBy([...storageData, newItem], 'id'));
  }
  enqueue(location ? LOCATION_UPDATE_DONE : LOCATION_CREATE_DONE, SUCCESS);
  filterData(dispatch, searchValue);
};

export const toggleStorageItem = (index, data, enqueue, dispatch) => {
  const newData = duplicate(data);
  const item = newData[index];
  item.visited = !item.visited;
  updateStorageData(item);
  enqueue(item.visited ? LOCATION_VISIT_ENABLED : LOCATION_VISIT_DISABLED, SUCCESS);
  dispatch(newData);
};

export const removeStorageItem = (
  item,
  data,
  location,
  enqueue,
  dispatchLocation,
  dispatchData,
) => {
  const filteredData = filterById(duplicate(data), item);
  if (location) {
    const selectedItemInList = filteredData.find(v => v.id === location.id);
    if (!selectedItemInList) {
      dispatchLocation(filteredData[0]);
    }
  }
  removeStorageData(item);
  enqueue(LOCATION_REMOVE_DONE, SUCCESS);
  dispatchData(filteredData);
};

export const managePosition = (dispatch, location) => {
  let pos = location ? { lat: location.lat, lng: location.lng } : defaultPosition;
  dispatch(pos);
};
