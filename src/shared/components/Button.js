import React from 'react';

const Button = ({
  type = 'button',
  classes = 'btn-primary',
  value,
  onClick
}) => (
  <button
    type={type}
    className={`btn ${classes}`}
    onClick={onClick}
  >
    {value}
  </button>
)

export default Button;