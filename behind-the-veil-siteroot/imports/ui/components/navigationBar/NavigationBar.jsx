/**
 * File Description: Navigation Bar React component
 * File version: 2.1
 * Contributors: Nikki
 */

import React, {useState, useEffect} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Tracker} from 'meteor/tracker';
import {Meteor} from "meteor/meteor";
import {useSubscribe, useTracker} from "meteor/react-meteor-data"
import {Bars3Icon, UserCircleIcon, XMarkIcon} from "@heroicons/react/24/outline"

import Button from "/imports/ui/components/button/Button.jsx";
import UrlBasePath from "/imports/ui/enums/UrlBasePath";
import "./navigationBar.css"
import {useUserInfo} from "../../components/util"

import ChatCollection from "/imports/api/collections/chats";


/**
 * Navigation Bar component for all pages of the app, relies on the Route object in App.js
 * for correct routing.
 */
export const NavigationBar = () => {

    // first level URL path for underlining the nav tab - e.g. services, artists. profile, etc
    const baseUrl = useLocation().pathname.split('/')[1];

    // variables for logged in user (if any)
    const [loggedInUserId, setLoggedInUserId] = useState(Meteor.userId());

    // When login status changes, this is automatically ran
    Tracker.autorun(() => {
        const userId = Meteor.userId();

        if (userId !== loggedInUserId) {
            setLoggedInUserId(Meteor.userId());
        }
    })

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

    // Determine if the user has unread messages
    const [unreadMessages, setUnreadMessages] = useState(false);

    // get current user information
    const userInfo = useUserInfo();

    // set up subscription (publication is in the "publication" folder)
    const isLoadingChats = useSubscribe('all_user_chats', userInfo.username);

    // get data from db
    let chatsData = useTracker(() => {
        return ChatCollection.find({
            $or: [
                { brideUsername: userInfo.username },
                { artistUsername: userInfo.username }
            ]
        }).fetch();
    });

    useEffect(() => {
        // update the unread messages status
        let unread = false;
        for (let i = 0; i < chatsData.length; i++) {
            if (userInfo.type === "bride" && chatsData[i].readByBride === false) {
                unread = true;
            }
            else if (userInfo.type === "artist" && chatsData[i].readByArtist === false) {
                unread = true;
            }
        }
        setUnreadMessages(unread);
    }, [chatsData]);

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
                {/*<li>*/}
                {/*    <NavLink to={`/${UrlBasePath.EXAMPLES}`}*/}
                {/*             onClick={() => {*/}
                {/*                 autoCloseMenu();*/}
                {/*             }}*/}
                {/*             className={baseUrl === UrlBasePath.EXAMPLES ?*/}
                {/*                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3 mr-12" :*/}
                {/*                 "main-text navbar-link-inactive p-3 mr-12"}>Examples Here</NavLink>*/}
                {/*</li>*/}
                {/*Home Page*/}
                <li>
                    <NavLink to={"/" + UrlBasePath.HOME}
                             onClick={() => {
                                 autoCloseMenu();
                             }}
                             className={baseUrl === UrlBasePath.HOME ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Home</NavLink>
                </li>
                {/*Services Page*/}
                <li>
                    <NavLink to={"/" + UrlBasePath.SERVICES}
                             onClick={() => {
                                 autoCloseMenu();
                             }}
                             className={baseUrl === UrlBasePath.SERVICES ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Services</NavLink>
                </li>
                {/*Artists Page*/}
                <li>
                    <NavLink to={"/" + UrlBasePath.ARTISTS}
                             onClick={() => {
                                 autoCloseMenu();
                             }}
                             className={baseUrl === UrlBasePath.ARTISTS ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3" :
                                 "main-text navbar-link-inactive p-3"}>Artists</NavLink>
                </li>
                {/*Messages Page*/}
                <li className={loggedInUserId ? "" : "hidden"}>
                    <NavLink to={"/" + UrlBasePath.MESSAGES}
                             onClick={() => {
                                 autoCloseMenu();
                             }}
                             className={baseUrl === UrlBasePath.MESSAGES ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3 relative" :
                                 "main-text navbar-link-inactive p-3 relative"}>Messages {unreadMessages && (
                                    <span className="absolute -top-0 -right-1 block h-2.5 w-2.5 rounded-full bg-red-600"></span>
                                  )}
                                 </NavLink>
                </li>
                {/*Login Page*/}
                <li className={!loggedInUserId ? "" : "hidden"}>
                    <NavLink to={"/" + UrlBasePath.LOGIN}
                             onClick={() => {
                                 autoCloseMenu();
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
                <li className={!loggedInUserId ? "" : "hidden"}>
                    <NavLink to={"/" + UrlBasePath.REGISTER}
                             onClick={() => {
                                 autoCloseMenu();
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
                <li className={loggedInUserId ? "" : "hidden"}>

                    <NavLink to={"/" + UrlBasePath.PROFILE}
                             onClick={() => {
                                 autoCloseMenu();
                             }}

                             className={baseUrl === UrlBasePath.PROFILE ?
                                 "main-text navbar-link-active lg:border-b-2 lg:border-dark-grey p-3 lg:p-0" :
                                 "main-text navbar-link-inactive p-3 lg:p-0"}>

                        {/*profile icon appears for horizontal menu, the word "Account" appears for vertical menu*/}
                        <span className="lg:hidden">Account</span>
                        <button><UserCircleIcon className="hidden lg:block min-h-14 w-14 cursor-pointer"/></button>
                    </NavLink>
                </li>

                {/*Logout button*/}
                <li className={loggedInUserId ? "" : "hidden"}>
                    <NavLink to="/"
                             onClick={() => {
                                 Meteor.logout();
                                 autoCloseMenu();
                             }}>
                        <Button type="button"
                                className="bg-white hover:bg-light-grey outline outline-2 outline-light-grey">
                            Logout
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
                    <NavLink to={"/" + UrlBasePath.HOME}
                             onClick={() => {
                                 autoCloseMenu();
                             }}
                    >
                        <img src="/logo.png" alt=""/>
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


