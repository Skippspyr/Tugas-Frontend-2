import React from 'react';
import Item from './Item/Item';

export interface DropdownItemProps {
  id: string,
  title: string;
  image: string;
  year: number;
};

const Dropdown: React.FC<{ children: React.ReactNode }> & { Item: typeof Item } = ({ children }) => {
  return (
    <ul className="search-form__dropdown">
      {children}
    </ul>
  );
};

Dropdown.Item = Item;

export default Dropdown;