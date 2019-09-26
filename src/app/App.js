import React, { useState, useEffect, useCallback } from 'react';
import { withSnackbar } from 'notistack';
import { Input } from 'shared/components';
import { Map, List } from './components';
import {
  createOrUpdateStorageItem,
  toggleStorageItem,
  removeStorageItem,
  filterData,
  managePosition,
  initializeView,
} from './actions';
import { mapConfig } from 'config/consts';

const { defaultPosition, defaultZoom } = mapConfig;
const mapElements = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100vh` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

const App = ({ enqueueSnackbar }) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  const [zoom, setZoom] = useState(defaultZoom);
  const [search, setSearchText] = useState('');
  const [position, setPosition] = useState(defaultPosition);

  const createOrUpdateItem = item => {
    createOrUpdateStorageItem(item, location, position, search, enqueueSnackbar, setData);
  };

  const toggleItem = useCallback(
    index => toggleStorageItem(index, data, enqueueSnackbar, setData),
    [data, enqueueSnackbar],
  );

  const removeItem = useCallback(
    item => removeStorageItem(item, data, location, enqueueSnackbar, setLocation, setData),
    [data, enqueueSnackbar, location],
  );

  const changeLocation = useCallback(location => {
    setZoom(location.zoom);
    setLocation(location);
  }, []);

  useEffect(() => initializeView(setMapUrl, setData), []);
  useEffect(() => managePosition(setPosition, location), [location]);
  useEffect(() => filterData(setData, search), [search]);

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

export default withSnackbar(App);
