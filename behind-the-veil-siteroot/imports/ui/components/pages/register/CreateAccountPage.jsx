/**
 * File Description: Create Account page
 * File version: 1.3
 * Contributors: Ryan, Nikki
 */

import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Accounts} from 'meteor/accounts-base';
import URLSearchParams from '@ungap/url-search-params'

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import Input from "../../input/Input";
import UrlBasePath from "../../../enums/UrlBasePath";

const CreateAccountPage = () => {
    const navigate = useNavigate();

    // form errors
    const [errors, setErrors] = useState({
        userType: "",
        username: "",
        alias: "",
        email: "",
        password: "",
        retypePassword: "",
    });

    // get the chosen account type from last page
    const [accountType, setAccountType] = useState(new URLSearchParams(useLocation().search).get("type"));

    if (accountType !== "bride" && accountType !== "artist") {
        // if invalid type in url, default to bride
        setAccountType("bride")
    }

    // get whether it errored before in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const isErrorEmail = urlParams.get("error") === "email";
    const isErrorUsername = urlParams.get("error") === "username";

    // if checks that display error is updated, prevents infinite loop
    if (!errors.email && isErrorEmail) {
        let newErrors = {}
        newErrors.email = "Email already has an account";
        setErrors(newErrors)

    } else if (!errors.username && isErrorUsername) {
        let newErrors = {}
        newErrors.username = "Username taken";
        setErrors(newErrors)

    } else if (!errors.retypePassword && urlParams.get("error") && !isErrorUsername && !isErrorEmail) {
        let newErrors = {}
        newErrors.retypePassword = "Account creation failed";
        setErrors(newErrors)
    }

    const handleRegister = (event) => {
        event.preventDefault();

        // get user inputs
        const username = document.getElementById('username').value.trim();
        const alias = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const retypePassword = document.getElementById('retypePassword').value;
        const artistServiceLocation = null;
        const artistServiceRadius = null;

        let newError = {}
        let isError = false;

        // check account type is checked
        if (!accountType) {
            newError.userType = "Please select a type of user"
            isError = true;
        }

        // Username validation criteria
        const alphanumericRegex = /^[A-Za-z0-9]+$/i;
        if (!username) {
            newError.username = 'Please fill in your username.';
            isError = true;

        } else if (!alphanumericRegex.test(username)) {
            newError.username = 'Username must only contain letters and numbers.';
            isError = true;

        } else if (username.length > 20) {
            newError.username = "Username cannot be longer than 20 characters"
            isError = true;
        }

        // Alias validation criteria
        const alphanumericSpaceRegex = /^[A-Za-z0-9 ]+$/i;
        if (!alias) {
            newError.alias = 'Please fill in your alias.';
            isError = true;

        } else if (!alphanumericSpaceRegex.test(alias)) {
            newError.alias = 'Alias cannot contain special character (except spaces).';
            isError = true;

        } else if (alias.length > 20) {
            newError.alias = 'Alias cannot be longer than 20 characters.';
            isError = true;
        }

        // Validate email using Meteor's built-in function
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!email) {
            newError.email = 'Please fill in your email.';
            isError = true;

        } else if (!emailRegex.test(email)) {
            newError.email = 'Please enter a valid email address.';
            isError = true;
        }

        // Password validation criteria
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password) {
            newError.password = 'Please fill in your password.';
            isError = true;

        } else if (!passwordRegex.test(password)) {
            newError.password = 'Password must adhere to requirements. Only special characters in the list are permitted.';
            isError = true;
        }

        // Check if retypePassword matches password
        if (!retypePassword) {
            newError.retypePassword = 'Please type your password again.';
            isError = true;

        } else if (password !== retypePassword) {
            newError.retypePassword = 'Passwords do not match.';
            isError = true;
        }

        setErrors(newError)

        if (!isError) {
            const newUser = {
                username: username,
                email: email,
                password: password,
                profile: {
                    alias: alias,
                    type: accountType
                }
            };

            Accounts.createUser(newUser, (error) => {
                if (error) {
                    if (error.reason.toLowerCase().includes("email")) {
                        // email is already taken
                        window.location.replace("?error=email")

                    } else if (error.reason.toLowerCase().includes("username")) {
                        // username is already taken
                        window.location.replace("?error=username")

                    } else {
                        // other reason
                        window.location.replace("?error=true")
                    }

                } else {
                    // verify its email right after it is created
                    Meteor.call("verify_email", Meteor.userId());
                    Meteor.logout()

                    // After successful activation, navigate to activation completed page
                    navigate(`/${UrlBasePath.REGISTER}/accountCreated`);
                }
            });
        }
    };

    const TextInput = ({labelText, id, name, error, placeholder, type = 'text', autoComplete = 'off'}) => {
        const existingFormValue = document.getElementById(id) ? document.getElementById(id).value : '';
        const [value, setValue] = useState(existingFormValue);

        const handleChange = (e) => {
            const inputValue = e.target.value.trim();
            setValue(inputValue);
        };

        return (
            <div className="flex flex-col gap-1">
                <Input
                    label={<label htmlFor={id} className="main-text">{labelText}</label>}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={handleChange}
                    className={"w-full"}
                />
                {error && <span className="text-cancelled-colour">{error}</span>}
            </div>
        );
    };

    const RadioInput = ({text, id}) => {
        // handle change
        const handleChange = (e) => {
            const inputValue = e.target.value;
            setAccountType(inputValue);
        };

        // set default checked one
        if (id === accountType) {
            return (
                <div className="flex flex-col items-center justify-center gap-1">
                    <label className="main-text text-dark-grey" htmlFor="artist">{text}</label>
                    <input checked={true} onChange={handleChange} className={"accent-secondary-purple-hover size-5"} type="radio" id={id} name="type" value={id}/>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col items-center justify-center gap-1">
                    <label className="main-text text-dark-grey" htmlFor="artist">{text}</label>
                    <input className={"accent-secondary-purple-hover size-5"} onChange={handleChange} type="radio" id={id} name="type" value={id}/>
                </div>
            )
        }


    }

    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            {/* Right side content */}
            <div className={"text-center pt-1"}>
                <div className="title-text mb-3 sm:mb-8">Create an Account</div>

                <form onSubmit={handleRegister} className={"flex flex-col items-center gap-4 p-2.5"}>
                    {/* Input fields for account creation */}

                    <div className={"flex flex-col gap-y-3 w-4/5 text-left"}>

                        <div className="flex flex-col gap-1">
                            <label className="main-text">User type</label>
                            <div className={"flex flex-row gap-x-[15%] items-center justify-center"}>
                                <RadioInput id={"bride"} text={"Bride"}/>
                                <RadioInput id={"artist"} text={"Artist"}/>
                                {errors.userType && <span className="text-cancelled-colour">{errors.userType}</span>}
                            </div>

                        </div>

                        <TextInput labelText="Username" id="username" name="username"
                                   placeholder="Enter your unique username" error={errors.username}/>
                        <TextInput labelText="Name/Alias" id="name" name="name" placeholder="Enter your name or alias"
                                   error={errors.alias}/>
                        <TextInput labelText="Email" id="email" name="email" placeholder="Enter your email"
                                   type="email" error={errors.email}/>
                        <TextInput labelText="Password" id="password" name="password" placeholder="Enter your password"
                                   type="password" autoComplete="new-password" error={errors.password}/>
                        <TextInput labelText="Retype Password" id="retypePassword" name="retypePassword"
                                   placeholder="Retype your password" type="password" autoComplete="new-password"
                                   error={errors.retypePassword}/>
                    </div>

                    {/* Password requirements message */}
                    <div className="small-text text-dark-grey text-left w-4/5">
                        Please ensure your password has at least:
                        <ul className={"list-disc list-inside"}>
                            <li className={"ml-2"}>a number (0-9)</li>
                            <li className={"ml-2"}>a special character (!@#$%^&*(),.?":{}|)</li>
                            <li className={"ml-2"}>a lowercase letter (a-z)</li>
                            <li className={"ml-2"}>an uppercase letter (A-Z)</li>
                            <li className={"ml-2"}>minimum 8 characters</li>
                        </ul>
                    </div>

                    <div className="hidden small-text text-dark-grey text-left w-4/5">
                        Your email address will only be used to send notifications about your account and bookings.
                        By clicking Register, you agree for "Behind the Veil" to store and use the above details
                        provided within the
                        "Behind the Veil" application only.
                    </div>

                    <Button type={"submit"}
                            className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40"}>
                        Register
                    </Button>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default CreateAccountPage;