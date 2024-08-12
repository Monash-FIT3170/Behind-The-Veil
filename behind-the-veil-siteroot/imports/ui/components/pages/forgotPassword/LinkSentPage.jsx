/**
 * File Description: Link Sent page
 * File version: 2.0
 * Contributors:  Ryan, Nikki
 */

import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowRightIcon, EnvelopeIcon} from "@heroicons/react/24/outline";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * Page that displays user has successfully sent link to email
 */
const LinkSentPage = () => {
    const navigate = useNavigate();

    // check URL, if you're on the reset password url or account created page
    const urlBase = useLocation().pathname.split('/')[1];

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>

            <div className="title-text text-center">{urlBase === UrlBasePath.REGISTER ? "Verify Your Email" : "Password Reset Link Sent"}</div>

            <div className={"flex flex-col items-center justify-center gap-y-3 p-2.5"}>
                <div className={"flex items-center justify-center"}>
                    <ArrowRightIcon className="text-confirmed-colour h-16 w-16 stroke-[1.5] mr-1"/>
                    <EnvelopeIcon className="h-28 w-28 stroke-[1.2] text-dark-grey"/>
                    <ArrowRightIcon className="invisible  h-16 w-16 stroke-[1.5] ml-1"/>
                </div>

                <div className={"w-4/5 text-center mt-1.5"}>
                    <div className={"main-text"}>
                        Please access the
                        <span className={"text-pending-colour"}> link </span>
                        sent to your email to {urlBase === UrlBasePath.REGISTER ? "verify your email" : "reset your password"}!
                    </div>
                </div>

                <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover  w-1/3 min-w-40"}
                        onClick={() => {
                            navigate("/" + UrlBasePath.LOGIN)
                        }}>
                    Return to Login
                </Button>
            </div>
        </WhiteBackground>
    );
};

export default LinkSentPage;