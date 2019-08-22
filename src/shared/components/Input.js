import React from 'react';

const Input = ({
  type = 'text',
  name,
  value,
  reference,
  placeholder,
  id,
  onChange,
}) => (
  <input
    id={id}
    type={type}
    value={value}
    name={name}
    ref={reference}
    className='form-control'
    aria-label='Sizing example input'
    aria-describedby='inputGroup-sizing-default'
    placeholder={placeholder || ''}
    onChange={onChange}
  />
)

export default Input;
