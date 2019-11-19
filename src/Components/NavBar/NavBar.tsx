import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>Path of Exile - Stash</h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/frontpage">Craft</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default NavBar;
