import React, { useEffect, useState, useRef } from 'react';
import { Input, Select, Button } from 'shared/components';
import { getEnumArrFrom } from 'shared/utils/helper';
import { mapConfig } from 'config/consts';

const { defaultZoom } = mapConfig;
const zoomButtonsArr = getEnumArrFrom(22);

const PopupForm = ({ location, onSubmit }) => {
  const [text, setText] = useState(location ? location.text : '');
  const [zoom, setZoom] = useState(location ? location.zoom : '');
  const inputField = useRef();

  const initializeOverlayData = () => {
    if (location) {
      setText(location.text);
      setZoom(location.zoom);
    }
  };

  const handleFormSubmission = e => {
    e.preventDefault();
    const modifiedData = location ? { ...location, text, zoom } : { text, zoom };
    modifiedData.zoom = Number(modifiedData.zoom || defaultZoom);
    onSubmit(modifiedData);
  };

  const focusToInput = () => inputField.current.focus();

  useEffect(focusToInput, []);
  useEffect(initializeOverlayData, [location]);

  return (
    <form onSubmit={handleFormSubmission}>
      <Input value={text} classes='mb-3' onChange={setText} reference={inputField} />
      <p className='card-text'>Select zoom factor.</p>
      <Select value={zoom} classes='mb-3' items={zoomButtonsArr} onChange={setZoom} />
      <Button
        type='submit'
        classes={`btn-${location ? 'info' : 'primary'}`}
        value={location ? 'Update' : 'Save'}
      />
    </form>
  );
};

export default PopupForm;
