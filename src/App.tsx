import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.scss';

import Topbar from './components/Topbar/Topbar';
import WishlistProvider from './context/wishlist/WishlistProvider';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Wishlist from './pages/WIshlist/Wishlist';

const App = () => {
  return (
    <WishlistProvider>
      <div className="App">
        <Topbar />
        <main className="main">
          <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/detail/:movieId" element={<Detail />} />
            <Route path="/s/:query" element={<Search />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </WishlistProvider>
  );
};

export default App;