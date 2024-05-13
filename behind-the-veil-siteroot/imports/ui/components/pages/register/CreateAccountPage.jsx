/**
 * File Description: Create Account page
 * File version: 1.0
 * Contributors: Ryan
 */

import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import URLSearchParams from '@ungap/url-search-params'

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const accountType = new URLSearchParams(useLocation().search).get("type");
    console.log(accountType);

    const handleRegister = () => {
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
            type: accountType,
            profile: {
                alias: alias
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
                navigate(`/register/activateAccount`);
            }
        });
    };

    const flexContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
    };

    const ActionButton = ({ marginTop, label, onClick }) => (
        <div style={{ marginTop: marginTop, width: "80%", display: "flex", justifyContent: "center" }}>
            <Button
                type="button"
                className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                style={{ width: "40%", height: "50px" }}
                onClick={onClick}
            >
                {label}
            </Button>
        </div>
    );

    const TextInput = ({ label, id, name, placeholder, type = 'text', autoComplete = 'off' }) => {
        const [value, setValue] = useState('');

        const handleChange = (e) => {
            const inputValue = e.target.value;
            setValue(inputValue);
        };

        return (
            <div>
                <label htmlFor={id} className="main-text">{label}</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={handleChange}
                    style={{
                        marginBottom: '5px',
                        width: '100%',
                        height: '50px',
                        border: '1px solid lightgrey',
                        borderRadius: '5px',
                        padding: '10px'
                    }}
                />
            </div>
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
                <span>Registration Page Visual here!!</span>
            </div>

            {/* Right side content */}
            <div style={{textAlign: "center", paddingTop: "5px"}}>
                <div className="title-text" style={{textAlign: "center", marginTop: "-20px"}}>Create an Account</div>
                <div style={flexContainerStyle}>
                    {/* Input fields for account creation */}
                    <div style={{width: "80%", textAlign: "left"}}>
                        <TextInput label="Username" id="username" name="username"
                                   placeholder="Enter your unique username"/>
                        <TextInput label="Name/Alias" id="name" name="name" placeholder="Enter your name or alias"/>
                        <TextInput label="Email" id="email" name="email" placeholder="Enter your email" type="email"/>
                        <TextInput label="Password" id="password" name="password" placeholder="Enter your password"
                                   type="password" autoComplete="new-password"/>
                        <TextInput label="Retype Password" id="retypePassword" name="retypePassword"
                                   placeholder="Retype your password" type="password" autoComplete="new-password"/>
                    </div>

                    {/* Password requirements message */}
                    <div className="message-tag-text" style={{textAlign: "left", marginTop: "-10px", width: "80%"}}>
                        Please ensure your password has at least:
                        <ul className={"list-disc list-inside"}>
                            <li>a number (0-9)</li>
                            <li>a special character (e.g. % & ! )</li>
                            <li>a lowercase letter (a-z)</li>
                            <li>an uppercase letter (A-Z)</li>
                            <li>minimum 8 characters</li>
                        </ul>
                    </div>

                    <ActionButton
                        marginTop="5px"
                        label="Register"
                        onClick={handleRegister}
                    />
                </div>
            </div>
        </WhiteBackground>
    );
};

export default CreateAccountPage;