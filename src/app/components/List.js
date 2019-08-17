import React from 'react';
import { Switch } from 'shared/components';

const List = ({ rows = [], onItemClick, onToggleItem, onRemoveItem }) => (
  <table className={`table ${rows.length ? 'table-hover' : ''} mb-0`}>
    <thead>
      <tr>
        <th scope='col'>Visited</th>
        <th scope='col'>Text</th>
        <th scope='col'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.length > 0 ? (
        rows.map((item, index) => (
          <tr key={item.id + '' + index} onClick={() => onItemClick(item)}>
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
              <button
                type='button'
                className='btn btn-secondary btn-sm badge'
                onClick={e => {
                  e.stopPropagation();
                  onRemoveItem(item);
                }}
              >
                Remove
              </button>
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

export default List;
