import React from 'react';

const Select = ({
  items = [],
  classes = '',
  value,
  onChange
}) => (
  <div className={`input-group ${classes}`}>
    <select className='custom-select' value={value} onChange={e => onChange(e.target.value)}>
      <option value=''>Choose...</option>
      {items.map(item => <option key={item} value={item}>{item}</option>)}
    </select>
  </div>
);
export default Select;