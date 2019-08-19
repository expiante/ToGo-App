import React, { useState, useEffect } from 'react';
import { sortByField, duplicate, filterById } from 'shared/utils/helper';
import { Input } from 'shared/components';
import { Map, List } from './components';
import { getStorageData, setStorageData, updateStorageData, removeStorageData } from './actions';
import { mapConfig } from 'config/consts';
import { mockData } from 'config/consts';

const { defaultPosition, defaultZoom } = mapConfig;

const App = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  const [search, setSearchText] = useState('');
  const [position, setPosition] = useState(() => duplicate(defaultPosition));

  const initializeView = () => {
    initializeMap();
    initializePageData();
  };

  const initializeMap = () => {
    const { url, key, ver, libs } = mapConfig;
    const fullURL = `${url}?key=${key}&v=${ver}&libraries=${libs.join(',')}`;
    setMapUrl(fullURL);
  };

  const initializePageData = () => {
    if (!getStorageData('data')) {
      setStorageData(mockData, 'data');
    }
    setData(getStorageData('data'));
  };

  const toggleItem = index => {
    const newData = duplicate(data);
    const item = newData[index];
    item.visited = !item.visited;
    updateStorageData(item);
    setSelectedItem(item);
    setData(newData);
  };

  const removeItem = item => {
    const filteredData = filterById(duplicate(data), item);
    if (selectedItem) {
      const selectedItemInList = filteredData.find(v => v.id === selectedItem.id);
      if (!selectedItemInList) {
        setSelectedItem(filteredData[0]);
      }
    }
    removeStorageData(item);
    setData(filteredData);
  };

  const createOrUpdateItem = item => {
    const storageData = getStorageData('data');
    let sortedData = [];
    let newItem = item;
    if (selectedItem) {
      const filteredData = storageData.filter(v => v.id !== item.id);
      sortedData = sortByField([...filteredData, item], 'id');
    } else {
      newItem = {
        id: storageData.length,
        visited: false,
        zoom: defaultZoom,
        ...position,
        ...item,
      }
      sortedData = sortByField([...storageData, newItem], 'id')
    }
    setSelectedItem(newItem);
    setStorageData(sortedData);
    setData(sortedData);
  };

  const filterData = () => {
    let storageData = getStorageData('data');
    let filteredData = storageData.filter(item =>
      item.text.replace(' ', '').match(new RegExp(search, 'gi')),
    );
    setData(filteredData);
  };

  const managePosition = () => {
    let pos = selectedItem ? { lat: selectedItem.lat, lng: selectedItem.lng } : defaultPosition;
    setPosition(pos);
  };

  useEffect(initializeView, []);
  useEffect(managePosition, [selectedItem]);
  useEffect(filterData, [search]);

  return (
    <section className='container-fluid'>
      <div className='row'>
        <div className='col-8 p-0'>
          {mapUrl && (
            <Map
              data={selectedItem}
              googleMapURL={mapUrl}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onFormSubmit={createOrUpdateItem}
              position={position}
              onSelectNewPosition={newPos => {
                setSelectedItem(null);
                setPosition(newPos);
              }}
            />
          )}
        </div>
        <div className='col-4 p-0'>
          <div className='bg-white'>
            <div className='card-body border-0 vh-100 d-flex flex-fill flex-column'>
              <div>
                <div className='input-group mb-3'>
                  <Input placeholder='Search...' onChange={e => setSearchText(e.target.value)} />
                </div>
                {selectedItem && (
                  <b className='text-info mb-3 d-inline-block'>{selectedItem.text}</b>
                )}
              </div>
              <div className='flex-fill overflow-auto'>
                <List
                  rows={data}
                  onItemClick={setSelectedItem}
                  onRemoveItem={removeItem}
                  onToggleItem={toggleItem}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
