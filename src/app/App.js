import React, { useState, useEffect, useCallback } from 'react';
import { sortBy, duplicate, filterById, filterBy } from 'shared/utils/helper';
import { Input } from 'shared/components';
import { Map, List } from './components';
import { getStorageData, setStorageData, updateStorageData, removeStorageData } from './actions';
import { mapConfig, mockData } from 'config/consts';

const { url, key, ver, libs, defaultPosition, defaultZoom } = mapConfig;
const mapElements = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100vh` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

const App = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  const [zoom, setZoom] = useState(defaultZoom);
  const [search, setSearchText] = useState('');
  const [position, setPosition] = useState(defaultPosition);

  const initializeView = () => {
    initializeMap();
    initializePageData();
  };

  const initializeMap = () => {
    const fullURL = `${url}?key=${key}&v=${ver}&libraries=${libs.join(',')}`;
    setMapUrl(fullURL);
  };

  const initializePageData = () => {
    if (!getStorageData('data')) setStorageData(mockData, 'data');
    setData(getStorageData('data'));
  };

  const toggleItem = useCallback(
    index => {
      const newData = duplicate(data);
      const item = newData[index];
      item.visited = !item.visited;
      updateStorageData(item);
      setData(newData);
    },
    [data],
  );

  const createOrUpdateItem = item => {
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
    filterData();
  };

  const removeItem = useCallback(
    item => {
      const filteredData = filterById(duplicate(data), item);
      if (location) {
        const selectedItemInList = filteredData.find(v => v.id === location.id);
        if (!selectedItemInList) {
          setLocation(filteredData[0]);
        }
      }
      removeStorageData(item);
      setData(filteredData);
    },
    [data, location],
  );

  const filterData = () => setData(filterBy(getStorageData('data'), search));

  const managePosition = () => {
    let pos = location ? { lat: location.lat, lng: location.lng } : defaultPosition;
    setPosition(pos);
  };

  const changeLocation = useCallback(location => {
    setZoom(location.zoom);
    setLocation(location);
  }, []);

  useEffect(initializeView, []);
  useEffect(managePosition, [location]);
  useEffect(filterData, [search]);

  return (
    <section className='container-fluid'>
      <div className='row'>
        <div className='col-8 p-0 map-container'>
          {mapUrl && (
            <Map
              data={data}
              location={location}
              zoom={zoom}
              googleMapURL={mapUrl}
              position={position}
              onFormSubmit={createOrUpdateItem}
              onSelectExistingLocation={setLocation}
              onSelectNewLocation={newPos => {
                setLocation(null);
                setPosition(newPos);
              }}
              {...mapElements}
            />
          )}
        </div>
        <div className='col-4 p-0'>
          <div className='bg-white'>
            <div className='card-body border-0 vh-100 d-flex flex-fill flex-column'>
              <div>
                <div className='input-group mb-3'>
                  <Input type='search' placeholder='Search...' onChange={setSearchText} />
                </div>
                {location && <b className='text-info mb-3 d-inline-block'>{location.text}</b>}
              </div>
              <div className='flex-fill overflow-auto'>
                <List
                  rows={data}
                  onItemClick={changeLocation}
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
