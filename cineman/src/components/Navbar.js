import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo-cnt">
          <img src={logo} id="logo-pic" alt="cineman" width="50px" />
          <h1 id="logo">cineman</h1>
        </div>
      </Link>
      <ul>
        <Link to="/watchlater">
          <li>Watch later</li>
        </Link>
        <Link to="/watched">
          <li>Watched</li>
        </Link>
      </ul>
    </div>
  );
}
