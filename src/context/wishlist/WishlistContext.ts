import React from 'react';

export interface WishlistContextType {
  movieIds: string[];
  addMovie: (id: string) => void;
  removeMovie: (id: string) => void;
};

const WishlistContext = React.createContext<Partial<WishlistContextType>>({});

export default WishlistContext;