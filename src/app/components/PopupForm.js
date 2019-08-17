import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'shared/components';

const PopupForm = ({ data, onSubmit }) => {
  const [value, setValue] = useState('');
  const inputField = useRef();

  const initializeOverlayData = () => {
    if (data) setValue(data.text);
  };

  const handleFormSubmission = e => {
    e.preventDefault();
    const modifiedData = data ? { ...data, text: value } : { text: value };
    onSubmit(modifiedData);
  };

  const focusToInput = () => inputField.current.focus();

  useEffect(focusToInput, []);
  useEffect(initializeOverlayData, [data]);

  return (
    <form onSubmit={handleFormSubmission}>
      <div className='mb-3'>
        <Input value={value} onChange={e => setValue(e.target.value)} reference={inputField} />
      </div>
      <button type='submit' className={`btn btn-${data ? 'info' : 'primary'}`}>
        {data ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default PopupForm;
