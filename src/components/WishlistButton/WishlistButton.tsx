import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import WishlistContext from '../../context/wishlist/WishlistContext';

enum WishlistButtonColor {
  red = 'red',
  white = 'white'
};

const WishlistButton: React.FC<{ size: string, movieId: string }> = (props) => {
  const { movieIds, addMovie, removeMovie } = useContext(WishlistContext);
  const wishlisted = movieIds?.includes(props.movieId) || false;
  const [color, setColor] = useState(wishlisted ? WishlistButtonColor.red : WishlistButtonColor.white);

  const mouseOverHandler = (event: React.SyntheticEvent) => {
    if (!wishlisted) {
      setColor(WishlistButtonColor.red);
    }
    event.stopPropagation();
  };

  const mouseOutHandler = (event: React.SyntheticEvent) => {
    if (!wishlisted) {
      setColor(WishlistButtonColor.white);
    }
    event.stopPropagation();
  };

  const clickHandler = () => {
    if (wishlisted) {
      removeMovie!(props.movieId);
    } else {
      addMovie!(props.movieId);
    }
  };

  return (
    <FaHeart
      style={{ color: color, zIndex: 199, cursor: 'pointer' }}
      size={props.size}
      // color={color}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onClick={clickHandler}
    />
  );
};

export default WishlistButton;