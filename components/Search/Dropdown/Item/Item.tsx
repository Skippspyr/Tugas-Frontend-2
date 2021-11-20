import React from 'react';
import { Link } from 'react-router-dom';

import { DropdownItemProps } from '../Dropdown';

const Item: React.FC<DropdownItemProps> = ({ id, title, image, year }) => {
  return (
    <li>
      <Link className="search-form__item" to={`/detail/${id}`}>
        <img src={image} alt="dropdown_image" />
        <div className="search-form__item-info">
          <p className="search-form__item-title">{title}</p>
          <p>Tahun: {year}</p>
        </div>
      </Link>
    </li>
  );
};

export default Item;
