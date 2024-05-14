/**
 * File Description: Registration page
 * File version: 1.1
 * Contributors: Nikki, Ryan
 */

import React from 'react';
import {useNavigate} from "react-router-dom";
import {PaintBrushIcon, SparklesIcon} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import LoginRegisterVisual from "../../visuals/LoginRegisterVisual";
import Button from "../../button/Button.jsx";

/**
 * Page where user can choose to sign up for an artist or bride account
 */
export const RegisterPage = () => {
    const navigate = useNavigate();

    /**
     * Handler function for choosing account type
     * @param {string} accountType - artist or bride account to create
     */
    const handleAccountTypeSelection = (accountType) => {
        console.log("Selected Type:", accountType);
        navigate("/register/createAccount?type=" + accountType);
    };

    /**
     * a multi use button/text for the choosing account type button for artist/bride
     *
     * @param {string} accountType - either bride or artist
     * @param {string} description - the description text under the button
     * @returns {JSX.Element} - the output button with the text under it styled
     */
    const AccountTypeOption = ({accountType, description}) => {
        const iconClasses = "size-8 sm:size-12 mb-1 mx-auto my-1 stroke-1.5 text-our-black";

        // icon for artist or bride
        const icon = accountType === 'artist' ?
            <PaintBrushIcon className={iconClasses}/> :
            <SparklesIcon className={iconClasses}/>;

        // button label
        const label = accountType === 'artist' ? "Artist" : "Bride";

        return (
            <div className={"flex flex-col items-center justify-center gap-y-3"}>
                <Button
                    type="button"
                    className="bg-secondary-purple hover:bg-secondary-purple-hover size-24 sm:size-32 mb-2.5"
                    onClick={() => {
                        console.log("Selected Type:", accountType);
                        navigate("/register/createAccount?type=" + accountType);
                    }}>
                    {label}
                    {icon}
                </Button>

                {/*description under button*/}
                <span className="main-text w-[70%]">{description}</span>
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
                <LoginRegisterVisual/>
            </div>

            {/* Right side content */}
            <div className={"text-center pt-1"}>
                <div className="title-text mb-6 sm:mb-12">Choose Account Type</div>

                {/* Buttons for account type selection */}
                <div className={"flex justify-center items-start gap-2"}>
                    {/*artist button*/}
                    <AccountTypeOption
                        accountType="artist"
                        description="I want to provide my services"
                        onClick={handleAccountTypeSelection}
                    />

                    {/*bride button*/}
                    <AccountTypeOption
                        accountType="bride"
                        description="I want to make bookings for services"
                        onClick={handleAccountTypeSelection}
                    />
                </div>
            </div>
        </WhiteBackground>
    );
};

export default RegisterPage;