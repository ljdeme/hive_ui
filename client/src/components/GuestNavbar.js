import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/hive-logo.png"

export default function GuestNavbar() {
  return (
    <nav className="navbar">
        <NavLink
            id="hive"
            to="/" >
            <img
                src= {logo}
                alt= "HIVE logo"/>
        </NavLink> 
        <div className="navbar-spacer"></div>
        <ul className="nav-links">
            <li className="nav-item">
                <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/documentation">Documentation</NavLink>
            </li>
            <li className="nav-login">
                <NavLink to="/login">
                    <input
                        className="nav-login"
                        type="button"
                        value="Join Now"
                    />
                </NavLink>
            </li>
        </ul>
    </nav>
  );
}
