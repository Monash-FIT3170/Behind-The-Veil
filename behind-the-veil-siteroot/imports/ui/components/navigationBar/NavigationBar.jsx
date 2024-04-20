import React, {useState} from "react";
import {NavLink} from "react-router-dom";


import Button from "../button/Button";
import {XMarkIcon, Bars3Icon} from "@heroicons/react/16/solid"

import "./navigationBar.css"

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const NavigationBar = () => {

    // variable for tracking which is the currently active tab
    const [activeTab, setActiveTab] = useState("none");

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
    const closeMenuOnMobile = () => {
        // 1024 is the min size of default "lg" in Tailwind
        // "lg" is the size used to change from small vs large screen in the below code
        if (window.innerWidth <= 1024) {
            setMenuShown(false);
        }
    };

    /**
     *
     * @returns {JSX.Element}
     * @constructor
     */
    const NavBarLinks = () => {
        return (
            // horizontal on large screens, vertical on smaller screens
            <ul className="flex list-none
            flex-col gap-y-5
            lg:flex-row lg:items-center lg:gap-x-5">
                <li>
                    <NavLink to="/examples"
                             onClick={() => {
                                 closeMenuOnMobile();
                                 setActiveTab("examples");
                             }}
                             className={ activeTab === "examples" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3 mr-12" :
                                 "main-text navbar-link-inactive p-3 mr-12"}>Examples Here</NavLink>
                </li>
                <li>
                    <NavLink to="/"
                             onClick={() => {
                                 closeMenuOnMobile();
                                 setActiveTab("home");
                             }}
                             className={ activeTab === "home" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/services"
                             onClick={() => {
                                 closeMenuOnMobile();
                                 setActiveTab("services");
                             }}
                             className={ activeTab === "services" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Services</NavLink>
                </li>
                <li>
                    <NavLink to="/artists"
                             onClick={() => {
                                 closeMenuOnMobile();
                                 setActiveTab("artists");
                             }}
                             className={ activeTab === "artists" ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Artists</NavLink>
                </li>
                <li>
                    <NavLink to="/login"
                             onClick={() => {
                                 closeMenuOnMobile();
                                 setActiveTab("login");
                             }}>
                        <Button type="button"
                                className="bg-white hover:bg-light-grey
                                    outline outline-2 outline-light-grey">
                            Sign In
                        </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register"
                             onClick={() => {
                                 closeMenuOnMobile();
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
                    <NavLink to="/" onClick={closeMenuOnMobile}>
                        Logo will be here
                        <img src="../../../../client/assets/Logo.png" alt=""/>
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


