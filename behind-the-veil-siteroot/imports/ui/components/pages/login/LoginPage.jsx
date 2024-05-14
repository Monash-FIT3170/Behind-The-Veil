/**
 * File Description: Sign-in page
 * File version: 1.0
 * Contributors: Kyle, Nikki
 */

import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Meteor} from 'meteor/meteor';
import {KeyIcon, UserIcon} from "@heroicons/react/24/outline";

import PageLayout from "../../../enums/PageLayout";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import LoginRegisterVisual from "../../visuals/LoginRegisterVisual";
import Button from "../../button/Button.jsx";
import Input from "../../input/Input";
import UserCollection from "../../../../api/collections/users";

/**
 * The Sign-In Page for the website.
 */
export const LoginPage = () => {

    // Constant navigate will allow the user to be redirected to different webpages.
    const navigate = useNavigate();

    /**
     * Handles the sign-in of the user. If the username and password match that of an object in the users collection,
     * then the user will be redirected to the Home Page, and they will be signed in. If the sign-in attempt fails, an
     * error message will display on the screen and the user will not be redirected nor signed in.
     */
    const authenticateUser = (event) => {

        // Prevents the page from re-rendering after the sign-in button is pressed, as this is unnecessary.
        event.preventDefault();

        // Getting the inputs from the user.
        const username = event.target.username.value.trim();
        const password = event.target.password.value;

        // Using a built-in Meteor method to attempt to sign the user in.
        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                // could not log in (don't explicitly say username or password incorrect for good security practice)
                alert('Username or password incorrect')
            } else {
                // logged in, get the account type
                const accountType= UserCollection.find({"username":username}).fetch()[0].profile.type;

                // If the user type is artist, redirect to the artist landing page.
                if (accountType === 'artist') {
                    navigate('/artist-profile/' + username);
                    // If the user type is bride, redirect to the bride landing page.
                } else {
                    navigate('/bride-profile/' + username);
                }
            }
        });
    }

    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            {/*Left div*/}
            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}
                <LoginRegisterVisual />
            </div>

            {/*Right Div*/}
            <div>
                <div className="title-text text-center">Sign In</div>

                {/* Wrapping the input fields and buttons in a form element so that the click of the sign-in button registers as an event */}
                <form onSubmit={authenticateUser}>

                    <div className={"flex flex-col items-center gap-4 mt-6"}>
                        <div className={"relative"}>
                            {/* The user icon in the username input field */}
                            <span className={"absolute left-2.5 top-1/2 -translate-y-1/2"}>
                                <UserIcon className={"icon-base text-dark-grey"}/>
                            </span>

                            {/* The username input field */}
                            <Input type="text"
                                   placeholder="Username"
                                   className={"pl-12 w-64 sm:w-96 lg:w-64 xl:w-96"}
                                   name="username"
                                   autoComplete="username"
                            />
                        </div>

                        <div className={"relative"}>
                            {/* The key icon in the password input field */}
                            <span className={"absolute left-2.5 top-1/2 -translate-y-1/2"}>
                                <KeyIcon className={"icon-base text-dark-grey"}/>
                            </span>

                            {/* The password input field */}
                            <Input type="password"
                                   placeholder="Password"
                                   className={"pl-12 w-64 sm:w-96 lg:w-64 xl:w-96 "}
                                   name="password"
                                   autoComplete="password"
                            />
                        </div>

                        <NavLink
                            className="text-hyperlink-colour underline cursor-pointer ml-auto mr-[10%] right-0"
                            to={"/forgot-password/email-verify"}>
                            Forgot password?
                        </NavLink>
                    </div>

                    <div className={"flex flex-col items-center gap-2.5 mt-6"}>
                        {/* The sign-in button. Clicking this will trigger user authentication. */}
                        <Button className="bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40"
                                type="submit">Sign in
                        </Button>

                        {/* The register button. Clicking this will take the user to the register webpage. */}
                        <Button className="w-1/3 min-w-40"
                                onClick={() => {
                                    navigate("/register");
                                }}>
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default LoginPage;
