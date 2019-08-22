import React, { useEffect, useState, useRef } from 'react';
import { Input, Button } from 'shared/components';
import { mapConfig } from 'config/consts';

const zoomButtonsArr = Array(12).fill(1);

const PopupForm = ({ location, onSubmit }) => {
  const [text, setText] = useState('');
  const [zoom, setZoom] = useState(mapConfig.defaultZoom);
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
    onSubmit(modifiedData);
  };

  const focusToInput = () => inputField.current.focus();

  useEffect(focusToInput, []);
  useEffect(initializeOverlayData, [location]);

  return (
    <form onSubmit={handleFormSubmission}>
      <div className='mb-3'>
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          reference={inputField}
        />
      </div>
      <p className='card-text'>
        Select zoom factor.
      </p>
      <div className='btn-group d-flex mb-4' role='group' aria-label='First group'>
        {zoomButtonsArr.map((v, k) => (
          <Button
            classes={`btn-sm btn-${zoom === k + 1 ? 'primary' : 'outline-primary'}`}
            value={k + 1}
            onClick={setZoom}
          />
        ))}
      </div>
      <button type='submit' className={`btn btn-${location ? 'info' : 'primary'}`}>
        {location ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default PopupForm;
