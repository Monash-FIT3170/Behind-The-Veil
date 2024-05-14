/**
 * File Description: Create Account page
 * File version: 1.1
 * Contributors: Ryan, Nikki
 */

import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Accounts} from 'meteor/accounts-base';
import URLSearchParams from '@ungap/url-search-params'

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import LoginRegisterVisual from "../../visuals/LoginRegisterVisual";
import Input from "../../input/Input";

const CreateAccountPage = () => {
    const navigate = useNavigate();

    // get the chosen account type from last page
    const accountType = new URLSearchParams(useLocation().search).get("type");


    const handleRegister = (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const alias = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const retypePassword = document.getElementById('retypePassword').value;

        if (!username || !alias || !email || !password || !retypePassword) {
            alert('Please fill in all required fields.');
            return;
        }

        // Password validation criteria
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&+/,|<>{})(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must contain at least one number, one special character, one lowercase letter, one uppercase letter, and be at least 8 characters long.');
            return;
        }

        // Check if retypePassword matches password
        if (password !== retypePassword) {
            alert('Passwords do not match.');
            return;
        }

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // Validate email using Meteor's built-in function
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

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
                alert(`Account creation failed: ${error.message}`);
            } else {
                // TODO send activation code via inputted email
                console.log('User created successfully!');
                console.log(newUser);
                // After successful activation, navigate to activation completed page
                navigate(`/register/activateAccount?username=${username}`);
            }
        });
    };

    const TextInput = ({labelText, id, name, placeholder, type = 'text', autoComplete = 'off'}) => {
        const [value, setValue] = useState('');

        const handleChange = (e) => {
            const inputValue = e.target.value;
            setValue(inputValue);
        };

        return (
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
        );
    };

    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>
            {/*you MUST keep this div and put everything on the left side (e.g. the visual) of it*/}
            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}
                <LoginRegisterVisual/>
            </div>

            {/* Right side content */}
            <div className={"text-center pt-1"}>
                <div className="title-text mb-3 sm:mb-8">Create an Account</div>

                <div className={"flex flex-col items-center gap-4 p-2.5"}>
                    {/* Input fields for account creation */}

                    <div className={"flex flex-col gap-y-3 w-4/5 text-left"}>

                        <TextInput labelText="Username" id="username" name="username"
                                   placeholder="Enter your unique username"/>
                        <TextInput labelText="Name/Alias" id="name" name="name" placeholder="Enter your name or alias"/>
                        <TextInput labelText="Email" id="email" name="email" placeholder="Enter your email"
                                   type="email"/>
                        <TextInput labelText="Password" id="password" name="password" placeholder="Enter your password"
                                   type="password" autoComplete="new-password"/>
                        <TextInput labelText="Retype Password" id="retypePassword" name="retypePassword"
                                   placeholder="Retype your password" type="password" autoComplete="new-password"/>
                    </div>

                    {/* Password requirements message */}
                    <div className="small-text text-dark-grey text-left w-4/5">
                        Please ensure your password has at least:
                        <ul className={"list-disc list-inside"}>
                            <li className={"ml-2"}>a number (0-9)</li>
                            <li className={"ml-2"}>a special character (e.g. % & ! )</li>
                            <li className={"ml-2"}>a lowercase letter (a-z)</li>
                            <li className={"ml-2"}>an uppercase letter (A-Z)</li>
                            <li className={"ml-2"}>minimum 8 characters</li>
                        </ul>
                    </div>

                    <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40"}
                            onClick={handleRegister}>
                        Register
                    </Button>
                </div>
            </div>
        </WhiteBackground>
    );
};

export default CreateAccountPage;