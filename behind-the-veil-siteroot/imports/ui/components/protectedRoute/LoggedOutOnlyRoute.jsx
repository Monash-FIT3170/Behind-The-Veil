/**
 * File Description: Protected route component that only allows NOT authenticated users
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import {Navigate} from "react-router-dom";

import {getUserAuth} from "../hooks/UserAuth.jsx";

/**
 * Protects a route that can ONLY be accessed by NOT logged-in users. Redirects users that are not logged in
 * trying to access the children item to the home page
 *
 * todo: complete logic when auth hook is done
 *  refer to: https://blog.logrocket.com/authentication-react-router-v6/
 *
 * @param children the Page/Component to be protected, such as the LoginPage and RegisterPage (only for not logged-in users)
 */
export const LoggedOutOnlyRoute = ({children}) => {

    // todo: edit this logic once login is done
    const user = getUserAuth();

    if (false) {
        // user IS authenticated, cannot access the given page, redirect to home page
        console.log("Cannot access, User is logged in"); // todo: delete after dev, for debugging/testing
        return <Navigate to="/"/>;
    }
    return children;
};

export default LoggedOutOnlyRoute;