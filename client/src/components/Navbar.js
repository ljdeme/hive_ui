import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate} from "react-router-dom";
import logo from "../images/hive-logo.png";
import logout from '../images/logout.png';

export default function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
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

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    function toggleMenu() {
        setIsSubMenuOpen(!isSubMenuOpen);
    }

    function handleLogout() {
        // Clear the user's session by removing the token from localStorage
        localStorage.removeItem('token');
        sessionStorage.removeItem('UID');
        setIsUserLoggedIn(false);
        setIsSubMenuOpen(false); // Close the submenu after logout
        navigate("/");
    }

    return (
        <nav>
            <NavLink id='hive' to='/'>
                <img src={logo} alt='HIVE logo' />
            </NavLink>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {isUserLoggedIn ? (   
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink to='/myFleets'>My Fleets</NavLink>
                    </li>
                    <li >
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/documentation'>Docs</NavLink>
                    </li>
                    <li >
                        <button className='profile-menu' onClick={toggleMenu}>Profile &#9663;</button>
                        <div className={isSubMenuOpen ? "submenu-wrap open-menu" : "submenu-wrap"} id='submenu'>
                            <div className='submenu'>
                                <div className='submenu-link' onClick={handleLogout}>
                                    <img src={logout} alt='logout img' />
                                    <p>Logout</p>
                                    <span>&gt;</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>    
            ): (
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink to="/about-us">About Us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/documentation">Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">
                            <input className="nav-login" type="button" value="Join Now" />
                        </NavLink>
                    </li>
                </ul> 
            )}
        </nav>
    );
}
