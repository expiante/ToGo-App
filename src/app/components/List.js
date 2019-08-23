import React, { useRef, memo } from 'react';
import { Switch, Button } from 'shared/components';

const List = ({ rows = [], onItemClick, onToggleItem, onRemoveItem }) => {
  const button = useRef();
  const toggle = useRef();

  const handleLocationSelection = (target, item) => {
    const buttonClick = target.isEqualNode(button.current);
    const toggleClick = target.isEqualNode(toggle.current);
    if (!buttonClick && !toggleClick) onItemClick(item);
  };

  return (
    <table className={`table ${rows.length ? 'table-hover' : ''} mb-0`}>
      <thead>
        <tr>
          <th scope='col'>Visited</th>
          <th scope='col'>Text</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((item, index) => (
            <tr key={`${item.id}-${index}`} onClick={e => handleLocationSelection(e.target, item)}>
              <th>
                <Switch
                  checked={item.visited}
                  reference={toggle}
                  rel={`item-${index}`}
                  onToggle={() => onToggleItem(index)}
                />
              </th>
              <td>{item.text}</td>
              <td>
                <Button
                  value='Remove'
                  reference={button}
                  classes='btn-secondary btn-sm badge'
                  onClick={() => onRemoveItem(item)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>No results found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default memo(List);
