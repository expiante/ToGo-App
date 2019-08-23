import React from 'react';

const Button = ({ type = 'button', classes = 'btn-primary', value, reference, onClick }) => (
  <button ref={reference} type={type} className={`btn ${classes}`} onClick={onClick}>
    {value}
  </button>
);

export default Button;
