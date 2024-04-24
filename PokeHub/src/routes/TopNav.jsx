import React from 'react';
import { Link, Outlet } from "react-router-dom";
import "./TopNav.css"; // Renamed CSS file

const TopNav = () => {
  return (
    <div className="wholeSite">
      <div className="topNav">
          <Link className="navButton" to="/">
              Home
          </Link>
          <Link className="navButton" to="/forum">
              Pokémon Forum
          </Link> 
      </div>
      <Outlet />
    </div>
  )
};

export default TopNav;
