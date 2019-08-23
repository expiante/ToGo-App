import React from 'react';

const Input = ({
  type = 'text',
  classes = '',
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
    className={`form-control ${classes}`}
    aria-label='Sizing example input'
    aria-describedby='inputGroup-sizing-default'
    placeholder={placeholder || ''}
    onChange={e => onChange(e.target.value)}
  />
);

export default Input;
