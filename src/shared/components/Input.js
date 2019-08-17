import React from 'react';

const Input = ({ onChange, placeholder, value, name, reference }) => {
  return (
    <input
      type='text'
      value={value}
      name={name}
      ref={reference}
      className='form-control'
      aria-label='Sizing example input'
      aria-describedby='inputGroup-sizing-default'
      placeholder={placeholder || ''}
      onChange={onChange}
    />
  );
};

export default Input;
