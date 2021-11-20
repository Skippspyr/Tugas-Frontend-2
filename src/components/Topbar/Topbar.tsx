import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './Topbar.scss';

const Topbar = () => {
  return (
    <nav className="topbar">
      <Routes>
        <Route path="/wishlist" element={<Link className="topbar__wishlist" to="/">Home</Link>} />
        <Route path="/*" element={<Link className="topbar__wishlist" to="/wishlist">Wishlist</Link>} />
      </Routes>
    </nav>
  );
};

export default Topbar;