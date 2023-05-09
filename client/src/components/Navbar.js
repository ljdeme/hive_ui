import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/nav-logo.png"

export default function Navbar() {
  return (
    <nav className="navbar">
        <Link
            id="hive"
            to="/" >
            <img
                src= {logo}
                alt= "HIVE logo"/>
        </Link> 
        <div className="navbar-spacer"></div>
        
        <ul className="nav-links">
            <li className="nav-item">
                <Link to="/about-us">About Us</Link>
            </li>
            <li className="nav-item">
                <Link to="/contact-us">Contact Us</Link>
            </li>
        </ul>

        <a href="/login">
            <button class="nav-login">Login</button>
        </a>
    </nav>
  );
}
