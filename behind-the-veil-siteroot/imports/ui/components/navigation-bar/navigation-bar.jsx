import React from "react";
import { NavLink } from "react-router-dom";

export const NavigationBar = () => {
    return (
        <header className="header">
            <nav className="nav">

                <NavLink to="/" className="nav_logo">
                    Logo will be here<img src="../../assets/Logo.png" alt=""/>
                </NavLink>

                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink to="/examples" className="nav__link">Examples Here</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/" className="nav__link">Home</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/services" className="nav__link">Services</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/artists" className="nav__link">Artists</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/login" className="btn-base-white">Sign In</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/register" className="btn-base-purple">Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};