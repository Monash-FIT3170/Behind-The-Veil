/**
 * File Description: Sign-in page
 * File version: 1.2
 * Contributors: Kyle, Nikki
 */

import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Meteor} from 'meteor/meteor';
import {KeyIcon, UserIcon} from "@heroicons/react/24/outline";

import PageLayout from "../../../enums/PageLayout";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import Button from "../../button/Button.jsx";
import Input from "../../input/Input";
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * The Sign-In Page for the website.
 */
export const LoginPage = () => {
    // Constant navigate will allow the user to be redirected to different webpages.
    const navigate = useNavigate();

    // form inputs and errors
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    // get whether it errored before in the URL
    const urlParams = new URLSearchParams(window.location.search);

    // if checks that display error is updated, prevents infinite loop
    if (urlParams.get("error") === "true" && !errors.password) {
        const newErrors = {}
        newErrors.password = "Username or password incorrect";
        setErrors(newErrors)
    }

    /**
     * Handles the sign-in of the user
     */
    const authenticateUser = (event) => {
        // Prevents the page from re-rendering after the sign-in button is pressed, as this is unnecessary.
        event.preventDefault();

        const newErrors = {}
        let isError = false;

        if (!username) {
            newErrors.username = "Please input your username";
            isError = true;
        }
        if (!password) {
            newErrors.password = "Please input your password";
            isError = true;
        }

        setErrors(newErrors)

        if (!isError) {
            // Using a built-in Meteor method to attempt to sign the user in.
            Meteor.loginWithPassword(username, password, (error) => {
                if (error) {
                    // could not log in (don't explicitly say username or password incorrect for good security practice)
                    window.location.replace("?error=true")

                } else {
                    // logged in, navigate to own profile page
                    navigate("/" + UrlBasePath.PROFILE);
                }
            });
        }
    }

    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            {/* Right side content */}
            <div>
                <div className="title-text text-center">Sign In</div>

                {/* Wrapping the input fields and buttons in a form element so that the click of the sign-in button registers as an event */}
                <form onSubmit={authenticateUser}>

                    <div className={"flex flex-col items-center gap-4 mt-6"}>

                        <div className="flex flex-col gap-1">
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
                                       onChange={(e) => {
                                           setUsername(e.target.value.trim())
                                       }}
                                />
                            </div>
                            {errors.username ? <span className="text-cancelled-colour">{errors.username}</span> : null}
                        </div>

                        <div className="flex flex-col gap-1">
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
                                       onChange={(e) => {
                                           setPassword(e.target.value.trim())
                                       }}
                                />
                            </div>
                            {errors.password ? <span className="text-cancelled-colour">{errors.password}</span> : null}
                        </div>
                        <NavLink
                            className="text-hyperlink-colour underline cursor-pointer ml-auto mr-[10%] right-0"
                            to={"/" + UrlBasePath.FORGOT_PASSWORD}>
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
                                    navigate("/" + UrlBasePath.REGISTER);
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
