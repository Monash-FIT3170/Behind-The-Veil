/**
 * File Description: Account Activated page
 * File version: 1.0
 * Contributors: Ryan
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import { useNavigate } from "react-router-dom";
import {
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

const AccountActivatedPage = () => {
    const navigate = useNavigate();

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

    const flexContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
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
                <div className="title-text" style={{textAlign: "center", marginTop: "20px"}}>Account Activated!</div>

                <div style={{marginTop: "10px"}}>
                    <CheckCircleIcon className="text-green-500 h-20 w-20 mx-auto"/>
                </div>

                <div style={flexContainerStyle}>
                    <div style={{marginTop: "10px"}}>
                    <label className="main-text">Please return to the sign in page</label>
                    </div>

                    <ActionButton
                        marginTop="20px"
                        label="Sign In"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </WhiteBackground>
    );
};

export default AccountActivatedPage;