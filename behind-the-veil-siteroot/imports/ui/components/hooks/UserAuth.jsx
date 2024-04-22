/**
 * File Description: The hook used to manage authenticated user's state using React's Context API nad useContent hook
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {createContext, useContext, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
// import { useLocalStorage } from "./useLocalStorage"; todo: implement local storage and persistent login state

// todo: some resources at
//  - https://blog.logrocket.com/adding-login-authentication-secure-react-apps/
//  - https://blog.logrocket.com/authentication-react-router-v6/


// create the React context for authentication management
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // function used to navigate users on success/failure of authenticating
    const navigate = useNavigate();

    // called to authenticate the user
    const login = async (data) => {

    };

    // call to sign out logged-in user
    const logout = () => {

    };

};

export const getUserAuth = () => {
    return false; // todo: hardcoded value, remove this and uncomment the below code once login is implemented
    // return useContext(AuthContext);
};

