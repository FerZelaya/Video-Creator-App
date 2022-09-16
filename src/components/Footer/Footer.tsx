import React from "react";
import { NavLink } from "react-router-dom";

import { FiHome, FiUser, FiLogOut } from "react-icons/fi";

import "./footer.css";

export const Footer: React.FC = () => (
  <footer>
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <FiHome size="2em" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <FiUser size="2em" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/signout">
            <FiLogOut size="2em" />
          </NavLink>
        </li>
      </ul>
    </nav>
  </footer>
);
