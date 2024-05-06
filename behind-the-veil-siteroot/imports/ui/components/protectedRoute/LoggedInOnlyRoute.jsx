/**
 * File Description: Protected route component that only allows authenticated users
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import {Navigate} from "react-router-dom";

import {getUserAuth} from "../hooks/UserAuth.jsx";

/**
 * Protects a route that can ONLY be accessed by logged-in users. Redirects users that are not logged in
 * trying to access the children item to the login page
 *
 * todo: complete logic when auth hook is done
 *  refer to: https://blog.logrocket.com/authentication-react-router-v6/
 *
 * @param children the Page/Component to be protected, such as the MessagesPage (only for logged-in users)
 */
export const LoggedInOnlyRoute = ({children}) => {

    // todo: edit this logic once login is done
    const user = getUserAuth();

    // overiding for coding purposes
    let overrideUser = true

    if (overrideUser === false || !overrideUser) {
        // user is NOT authenticated, cannot access page, redirect to login page
        console.log("Cannot access, User is logged out"); // todo: delete after dev, for debugging/testing
        return <Navigate to="/login"/>;
    }
    return children;
};

export default LoggedInOnlyRoute;