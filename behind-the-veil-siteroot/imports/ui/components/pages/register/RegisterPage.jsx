/**
 * File Description: Registration page
 * File version: 1.0
 * Contributors: Nikki, Ryan
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";

/**
 * Page where user can sign up for a new account
 */
export const RegisterPage = () => {
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
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            {/* Registration form on the right */}
            <div>
                <div className="title-text" style={{ textAlign: "center", marginTop: "-20px" }}>Create an account</div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px"
                }}>
                    <div style={{width: "80%", textAlign: "left"}}>
                        <label htmlFor="username" className="main-text">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username - Must be unique*"
                            autoComplete="off"
                            style={{
                                width: "100%",
                                height: "50px",
                                border: "1px solid lightgrey",
                                borderRadius: "5px",
                                padding: "10px"
                            }}
                        />

                        <label htmlFor="name" className="main-text">Name/Alias</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name or alias"
                            autoComplete="off"
                            style={{
                                width: "100%",
                                height: "50px",
                                border: "1px solid lightgrey",
                                borderRadius: "5px",
                                padding: "10px"
                            }}
                        />

                        <label htmlFor="email" className="main-text">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            style={{
                                width: "100%",
                                height: "50px",
                                border: "1px solid lightgrey",
                                borderRadius: "5px",
                                padding: "10px"
                            }}
                        />

                        <label htmlFor="password" className="main-text">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            style={{
                                width: "100%",
                                height: "50px",
                                border: "1px solid lightgrey",
                                borderRadius: "5px",
                                padding: "10px"
                            }}
                        />

                        <label htmlFor="retypePassword" className="main-text">Retype Password</label>
                        <input
                            type="password"
                            id="retypePassword"
                            name="retypePassword"
                            placeholder="Retype your password"
                            autoComplete="new-password"
                            style={{
                                width: "100%",
                                height: "50px",
                                border: "1px solid lightgrey",
                                borderRadius: "5px",
                                padding: "10px"
                            }}
                        />

                        {/* Password requirements message */}
                        <div className="message-tag-text" style={{textAlign: "left", marginTop: "10px"}}>
                            Please ensure your password has at least:
                            <ul>
                                <li>a number (0-9)</li>
                                <li>a special character (e.g. % & ! )</li>
                                <li>a lowercase letter (a-z)</li>
                                <li>an uppercase letter (A-Z)</li>
                                <li>minimum 8 characters</li>
                            </ul>
                        </div>

                        {/* Register button */}
                        <div style={{marginTop: "20px", width: "100%", display: "flex", justifyContent: "center"}}>
                            <Button
                                type="button"
                                className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                                style={{width: "40%", height: "50px"}}
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div>*/}
            {/*    <span>Registration Page to be done!!</span>*/}
            {/*</div>*/}
        </WhiteBackground>
    );
};

export default RegisterPage;