import React from 'react';

const Switch = ({ checked, rel, reference, labelText, onToggle }) => {
  return (
    <div
      className='custom-control custom-switch'
      role='presentation'
      onClick={e => e.stopPropagation()}
    >
      <input
        type='checkbox'
        ref={reference}
        checked={checked}
        onChange={onToggle}
        className='custom-control-input'
        id={rel}
      />
      <label className='custom-control-label' htmlFor={rel}>
        {labelText}
      </label>
    </div>
  );
};

export default Switch;
