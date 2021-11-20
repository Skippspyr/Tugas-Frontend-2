import React, { useReducer } from 'react'

import WishlistContext from './WishlistContext'

type WishlistActionType =
  | { type: 'add_movie', payload: { id: string } }
  | { type: 'remove_movie', payload: { id: string } };

interface WishlistStateType {
  ids: string[]
};

const WishlistReducer = (state: WishlistStateType, action: WishlistActionType): WishlistStateType => {
  switch (action.type) {
    case 'add_movie':
      const { id: addedId } = action.payload;

      if (!state.ids.includes(addedId)) {
        return {
          ids: [...state.ids, addedId],
        };
      } else {
        return {
          ...state
        }
      }
    case 'remove_movie':
      const { id: removeId } = action.payload;

      return {
        ids: state.ids.filter(i => i !== removeId),
      };
    default:
      return state;
  }
};

const WishlistProvider: React.FC<{}> = (props) => {
  const currentWishlist = localStorage.getItem('wishlist');
  const [state, dispatch] = useReducer(WishlistReducer, { ids: JSON.parse(currentWishlist || "[]") });

  const addMovie = (id: string) => {
    dispatch({ type: 'add_movie', payload: { id } });

    const movies = localStorage.getItem('wishlist');
    const moviesArray = movies ? JSON.parse(movies) as string[] : [] as string[]

    if (!moviesArray.includes(id)) {
      localStorage.setItem('wishlist', JSON.stringify([...moviesArray, id]));
    }
  };

  const removeMovie = (id: string) => {
    dispatch({ type: 'remove_movie', payload: { id } });

    const movies = localStorage.getItem('wishlist');
    const moviesArray = movies ? JSON.parse(movies) as string[] : [] as string[]

    if (moviesArray.includes(id)) {
      const newMovies = moviesArray.filter(m => m !== id);
      localStorage.setItem('wishlist', JSON.stringify(newMovies));
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        movieIds: state.ids,
        addMovie,
        removeMovie
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  )
}

export default WishlistProvider
