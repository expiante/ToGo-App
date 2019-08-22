import React from 'react';

const Button = ({
  type = 'button',
  classes = '',
  value,
  onClick
}) => (
  <button
    type={type}
    className={`btn ${classes}`}
    onClick={() => onClick(value)}
  >
    {value}
  </button>
)

export default Button;