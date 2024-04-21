/**
 * File Description: Navigation Bar React component
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {XMarkIcon, Bars3Icon, UserCircleIcon} from "@heroicons/react/24/outline"

import Button from "../button/Button.jsx";
import {getUserAuth} from "../hooks/UserAuth.jsx";
import "./navigationBar.css"

// const logo1 = require("../../../../client/logo.png");

/**
 * Navigation Bar component for all pages of the app, relies on the Route object in App.js
 * for correct routing.
 *
 * TODO: complete login check after Auth hook is done
 */
export const NavigationBar = () => {

    // variable for if user is logged in
    // TODO: Replace with call to actual Authentication hook
    const user = getUserAuth();
    const [loggedInUser, setLoggedInUser] = useState(user) // temp currently hardcoded

    // variable for tracking which is the currently active tab
    const [activeTab, setActiveTab] = useState("home");

    // Code for menu open and close
    const [menuShown, setMenuShown] = useState(false);

    // Function that closes menu (for small screens)
    const closeMenu = () => {
        setMenuShown(false);
    };

    // Function that expands menu (for small screens)
    const expandMenu = () => {
        setMenuShown(true);
    };

    // after a link has been pressed on a small screen, menu disappears
    const autoCloseMenu = () => {
        // 1024 is the min size of default "lg" in Tailwind
        // "lg" is the size used to change from small vs large screen in the below code
        if (window.innerWidth <= 1024) {
            setMenuShown(false);
        }
    };

    /**
     * A component for all the LINKS in the nav bar (such as link to services, artists, etc.)
     * Reused twice in Navigation bar component once for vertical mobile menu, once for normal top menu
     */
    const NavBarLinks = () => {
        return (
            // horizontal menu on large screens, vertical menu on smaller screens
            <ul className="flex list-none
            flex-col gap-y-5
            lg:flex-row lg:items-center lg:gap-x-5">
                {/*Examples page TODO: remove once dev is done*/}
                <li>
                    <NavLink to="/examples"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("examples");
                             }}
                             className={activeTab === "examples" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3 mr-12" :
                                 "main-text navbar-link-inactive p-3 mr-12"}>Examples Here</NavLink>
                </li>
                {/*Home Page*/}
                <li>
                    <NavLink to="/"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("home");
                             }}
                             className={activeTab === "home" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Home</NavLink>
                </li>
                {/*Services Page*/}
                <li>
                    <NavLink to="/services"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("services");
                             }}
                             className={activeTab === "services" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Services</NavLink>
                </li>
                {/*Artists Page*/}
                <li>
                    <NavLink to="/artists"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("artists");
                             }}
                             className={activeTab === "artists" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Artists</NavLink>
                </li>
                {/*Messages Page*/}
                <li className={loggedInUser ? "" : "hidden"}>
                    <NavLink to="/messages"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("messages");
                             }}
                             className={activeTab === "messages" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Messages</NavLink>
                </li>
                {/*Login Page*/}
                <li className={!loggedInUser ? "" : "hidden"}>
                    <NavLink to="/login"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("login");
                             }}>
                        <Button type="button"
                                className="
                                bg-white hover:bg-light-grey
                                outline outline-2 outline-light-grey">
                            Sign In
                        </Button>
                    </NavLink>
                </li>
                {/*Register Page*/}
                <li className={!loggedInUser ? "" : "hidden"}>
                    <NavLink to="/register"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("register");
                             }}>
                        <Button type="button"
                                className="
                                    bg-secondary-purple hover:bg-secondary-purple-hover
                                    outline outline-2 outline-secondary-purple">
                            Register
                        </Button>
                    </NavLink>
                </li>
                {/*Profile Page*/}
                <li className={loggedInUser ? "" : "hidden"}>
                    {/*todo: unsure how profiles will work yet (if bride and artist separate or not todo later*/}
                    <NavLink to="/account"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("account");
                             }}
                             className={activeTab === "account" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3 lg:p-0" :
                                 "main-text navbar-link-inactive p-3 lg:p-0"}>

                        {/*profile icon appears for horizontal menu, the word "Account" appears for vertical menu*/}
                        <span className="lg:hidden">Account</span>
                        <button><UserCircleIcon className="hidden lg:block min-h-14 w-14 cursor-pointer"/></button>
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <header className=
                    "header fixed top-0 left-0 z-[999] px-8 bg-white border-b-2 border-light-grey w-full">
            <nav>

                {/* Contains all the non-mobile/large screen menu */}
                <div className="flex items-center justify-between relative h-16 m-4">

                    {/* LOGO */}
                    <NavLink to="/"
                             onClick={() => {
                                 autoCloseMenu();
                                 setActiveTab("home");
                                 setLoggedInUser(!loggedInUser); // todo: temp, hard coded for testing
                             }}
                    >
                        Logo (also press to toggle UI for testing)
                        <img src="../../../../client/logo.png" alt=""/>
                    </NavLink>

                    {/* All the navigation links in a list (hidden when small screen) */}
                    <div className="hidden lg:flex">
                        <NavBarLinks></NavBarLinks>
                    </div>

                    {/* small screen hamburger menu control buttons*/}
                    <div className="lg:hidden flex items-center">
                        {/* Display Icon button depending on if menu is opened or closed*/}
                        {
                            menuShown === true ?
                                // menu is currently shown, can close it
                                <button onClick={closeMenu}>
                                    <XMarkIcon className="h-12 w-12 cursor-pointer
                            text-secondary-purple hover:text-secondary-purple-hover transition duration-500 ease-in-out"/>
                                </button>
                                :
                                // menu is currently closed, can open it
                                <button onClick={expandMenu}>
                                    <Bars3Icon className="h-12 w-12 cursor-pointer
                            text-secondary-purple hover:text-secondary-purple-hover transition duration-500 ease-in-out"/>
                                </button>
                        }
                    </div>
                </div>

                {/* This is the vertical menu which appears when small screens once menu button clicked*/}
                {menuShown === true ? <div className="pb-10 lg:hidden"><NavBarLinks></NavBarLinks></div> : null}
            </nav>
        </header>
    );
};

export default NavigationBar;


