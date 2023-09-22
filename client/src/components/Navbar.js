import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../images/hive-logo.png"
// import user from '../images/user.png'
// import settings from '../images/settings.png'
// import logout from '../images/logout.png'


export default function Navbar() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        // Check if a JWT token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
        // Verify the token on the server (optional)
        // If token is valid, set isLoggedIn to true
        setIsUserLoggedIn(true);
        }
    }, []);
    
    return (
    <div>
        {isUserLoggedIn ? 
        (
            <nav className='navbar'>
                <NavLink
                    id='hive'
                    to='/' >
                    <img
                        src= {logo}
                        alt= 'HIVE logo'/>
                </NavLink> 
                <div className='navbar-spacer'></div>
                <ul className='nav-links'>
                    <li className='nav-item'>
                        <NavLink to='/myFleets'>My Fleets</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/documentation'>Docs</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/profile'> Profile </NavLink>
                            {/* <div className='dropdown-menu'>
                                <h3>Hello, [Insert UserName]!</h3>
                                <ul>
                                    <DropdownItem
                                        img = {user}
                                        text = {'My Profile'}
                                    />

                                    <DropdownItem
                                        img = {settings}
                                        text = {'Settings'}
                                    />
                                    <DropdownItem
                                        img = {logout}
                                        text = {'Logout'}
                                    />
                                </ul>
                            </div> */}
                    </li>
                </ul>
            </nav>
        )
        : 
        (
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
        )}
    </div>
  );
}
