/**
 * File Description: Registration page
 * File version: 1.0
 * Contributors: Nikki, Ryan
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import { useNavigate } from "react-router-dom";
import {
    PaintBrushIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
/**
 * Page where user can sign up for a new account
 */
export const RegisterPage = () => {
    const navigate = useNavigate();

    const handleAccountTypeSelection = (accountType) => {
        console.log("Selected Type:", accountType);
        navigate("/register/createAccount?type=" + accountType);
    };

    const AccountTypeOption = ({ accountType, label, onClick }) => {
        const iconClasses = "h-12 w-12 mb-1 mx-auto my-1 stroke-1.5";

        const icon = accountType === 'Artist' ?
            <PaintBrushIcon className={iconClasses} /> :
            <SparklesIcon className={iconClasses} />;

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button
                    type="button"
                    className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                    style={{ width: "120px", height: "120px", borderRadius: "50%", marginBottom: "10px"}}
                    onClick={() => onClick(accountType)}
                >
                    {accountType}
                    {icon}
                </Button>
                <label htmlFor={accountType} className="main-text" style={{ width: "70%" }}>{label}</label>
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
                <div className="title-text" style={{marginBottom: "50px"}}>Choose Account Type</div>

                {/* Buttons for account type selection */}
                <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                    <AccountTypeOption
                        accountType="artist"
                        label="I want to provide my services"
                        onClick={handleAccountTypeSelection}
                    />

                    <AccountTypeOption
                        accountType="bride"
                        label="I want to make bookings for services"
                        onClick={handleAccountTypeSelection}
                    />
                </div>
            </div>
        </WhiteBackground>
    );
};

export default RegisterPage;