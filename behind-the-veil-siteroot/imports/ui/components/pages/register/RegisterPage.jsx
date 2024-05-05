/**
 * File Description: Registration page
 * File version: 1.0
 * Contributors: Nikki, Ryan
 */

import React, { useState } from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";

/**
 * Page where user can sign up for a new account
 */
export const RegisterPage = () => {
    const [showAccountCreation, setShowAccountCreation] = useState(false);
    const [showActivation, setShowActivation] = useState(false); // State to track activation phase
    const [showCompleted, setShowCompleted] = useState(false); // Track activation completion

    const handleAccountTypeSelection = () => {
        // Update state to show account creation section
        console.log("Selected Type");
        setShowAccountCreation(true);
        setShowCompleted(false);
        setShowActivation(false);
    };

    const handleRegister = () => {
        console.log("Registered account...");
        setShowActivation(true);
        setShowAccountCreation(false);
        setShowCompleted(false);
    };

    const handleActivation = () => {
        console.log("Activating account...");
        setShowCompleted(true);
        setShowActivation(false);
        setShowAccountCreation(false);
    };

    const flexContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
    };

    const AccountTypeOption = ({ type, label, onClick }) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button
                    type="button"
                    className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                    style={{ width: "120px", height: "120px", borderRadius: "50%", marginBottom: "10px" }}
                    onClick={() => onClick(type)}
                >
                    {type}
                </Button>
                <label htmlFor={type} className="main-text">{label}</label>
            </div>
        );
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
        return (
            <div>
                <label htmlFor={id} className="main-text">{label}</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
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
            <div style={{ textAlign: "center", paddingTop: "5px" }}>
                {showAccountCreation ? (
                    // Account creation section
                    <>
                        <div className="title-text" style={{ textAlign: "center", marginTop: "-20px" }}>Create an Account</div>

                        <div style={flexContainerStyle}>
                            {/* Input fields for account creation */}
                            <div style={{ width: "80%", textAlign: "left" }}>
                                <TextInput label="Username" id="username" name="username" placeholder="Enter your unique username" />
                                <TextInput label="Name/Alias" id="name" name="name" placeholder="Enter your name or alias" />
                                <TextInput label="Email" id="email" name="email" placeholder="Enter your email" type="email" />
                                <TextInput label="Password" id="password" name="password" placeholder="Enter your password" type="password" autoComplete="new-password" />
                                <TextInput label="Retype Password" id="retypePassword" name="retypePassword" placeholder="Retype your password" type="password" autoComplete="new-password" />
                            </div>

                            {/* Password requirements message */}
                            <div className="message-tag-text" style={{ textAlign: "left", marginTop: "-10px", width: "80%" }}>
                                Please ensure your password has at least:
                                <ul>
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
                    </>
                ) : showActivation ? (
                    // Activation section
                    <>
                        <div className="title-text" style={{ textAlign: "center", marginTop: "10px" }}>Activate Your Account</div>

                        <div style={flexContainerStyle}>
                            <div style={{ width: "80%", textAlign: "center", marginTop: "20px"}}>
                            <TextInput label="Please enter the 6-digit code sent to your email" id="activationCode" name="activationCode" placeholder="Enter activation code" />
                            </div>

                            <ActionButton
                                marginTop="30px"
                                label="Activate"
                                onClick={handleActivation}
                            />
                        </div>
                    </>
                ) : showCompleted ? (
                    // Activation success message
                    <>
                        <div className="title-text" style={{ textAlign: "center", marginTop: "40px" }}>Account Activated!</div>

                        <div style={flexContainerStyle}>
                            <div style={{ marginTop: "20px" }}>
                                <label className="main-text">Please return to the sign in page</label>
                            </div>

                            <ActionButton
                                marginTop="40px"
                                label="Sign In"
                                onClick={() => console.log("Navigate to sign in page")} // TODO: Implement sign in navigation
                            />
                        </div>
                    </>
                ) : (
                    // Account type selection section
                    <>
                        <div className="title-text" style={{marginBottom: "50px"}}>Choose Account Type</div>

                        {/* Buttons for account type selection */}
                        <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                            <AccountTypeOption
                                type="Artist"
                                label="I want to provide my services"
                                onClick={handleAccountTypeSelection}
                            />

                            <AccountTypeOption
                                type="Bride"
                                label="I want to make bookings for services"
                                onClick={handleAccountTypeSelection}
                            />
                        </div>
                    </>
                )}
            </div>
        </WhiteBackground>
    );
};

export default RegisterPage;