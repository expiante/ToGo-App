import React, { memo } from 'react';
import { Switch, Button } from 'shared/components';

const List = ({ rows = [], onItemClick, onToggleItem, onRemoveItem }) => {
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
            <tr key={`${item.id}-${index}`} onClick={e => onItemClick(item)}>
              <th>
                <Switch
                  checked={item.visited}
                  rel={`item-${index}`}
                  onToggle={e => {
                    e.stopPropagation();
                    onToggleItem(index);
                  }}
                />
              </th>
              <td>{item.text}</td>
              <td>
                <Button
                  value='Remove'
                  classes='btn-secondary btn-sm badge'
                  onClick={e => {
                    e.stopPropagation();
                    onRemoveItem(item);
                  }}
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
