/**
 * File Description: Sign-in page
 * File version: 1.0
 * Contributors: Kyle
 */

import React from 'react';
import { NavLink } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useNavigate } from "react-router-dom";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import SignInImage from '../../images/SignInImage.jsx';

import {
    UserIcon,
    KeyIcon
} from "@heroicons/react/24/outline";

// The Sign In Page for the website.
export const LoginPage = () => {

    // Constant navigate will allow the user to be redirected to different webpages.
    const navigate = useNavigate();

    /* method authenticateUser()

       Handles the sign-in of the user. If the username and password match that of an object in the users collection,
       then the user will be redirected to the Home Page and they will be signed in. If the sign-in attempt fails, an
       error message will display on the screen and the user will not be redirected nor signed in.

       Params: ... */ 
    const authenticateUser = (event) => {

        // Prevents the page from re-rendering after the sign-in button is pressed, as this is unnecessary.
        event.preventDefault();

        // Getting the inputs from the user.
        const username = event.target.username.value.trim();
        const password = event.target.password.value;

        // Using a built-in Meteor method to attempt to sign the user in.
        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                console.log('Login failed');
            } else {
                console.log('Login successful');
                // TODO: If the user type is artist, redirect to the artist landing page.
                if (accountType == 'Artist') {
                    navigate('/');
                // TODO: If the user type is bride, redirect to the bride landing page.
                } else {
                    navigate('/');
                }
            }
        });
    }

    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                

                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}

                <div style={{display: "flex", flexDirection: "column", gap: "100px", alignItems: "center", textAlign: "center"}}>

                    <div className="title-text text-secondary-purple-hover" style={{width: "400px"}}>Bridal Makeup & Services</div>

                    {/* The image displayed on the left-hand side of the screen. */}
                    <SignInImage></SignInImage>
                </div>
            </div>

            <div>

                <div className="title-text" style={{textAlign: "center"}}>Sign In</div>

                {/* Wrapping the input fields and buttons in a form element so that the click of the sign-in button registers as an event */}
                <form onSubmit={authenticateUser}>

                    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "10px", marginTop: "50px" }}>

                        <div style={{ position: 'relative' }}>

                            {/* The user icon in the username input field */}
                            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                                <UserIcon className="size-6 stroke-[2]" color="gray" />
                            </span>

                            {/* The username input field */}
                            <input type="text" placeholder="Username" name="username" id="username" style={{ height: "30px", width: "300px", paddingLeft: '40px', outline: "1px solid lightgray", borderRadius: "3px" }} />
                        </div>

                        <div style={{ position: 'relative' }}>

                            {/* The key icon in the password input field */}
                            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                                <KeyIcon className="size-6 stroke-[2]" color="gray" />
                            </span>

                            {/* The password input field */}
                            <input type="password" placeholder="Password" name="password" id="password" style={{ height: "30px", width: "300px", paddingLeft: '40px', outline: "1px solid lightgray", borderRadius: "3px" }} />
                        </div>

                        <div className="text-hyperlink-colour underline" style={{ cursor: "pointer", marginLeft: "auto", marginRight: "75px" }}>Forgot password?</div>

                    </div>
                    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "10px", marginTop: "50px" }}>

                        {/* The sign-in button. Clicking this will trigger user authentication. */}
                        <Button className="bg-secondary-purple hover:bg-secondary-purple-hover" style={{ width: "150px" }} type="submit">Sign in</Button>

                        {/* The register button. Clicking this will take the user to the register webpage. */}
                        <NavLink to="/register"><Button style={{ width: "150px" }}>Register</Button></NavLink>
                    </div>

                </form>

            </div>

        </WhiteBackground>
    );
};

export default LoginPage;
