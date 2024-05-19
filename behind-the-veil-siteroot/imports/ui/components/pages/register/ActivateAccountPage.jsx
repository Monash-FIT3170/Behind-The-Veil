/**
 * File Description: Activate Account page
 * File version: 1.1
 * Contributors: Ryan, Nikki
 */

import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowRightIcon, EnvelopeIcon} from "@heroicons/react/24/outline";

import URLSearchParams from "@ungap/url-search-params";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";

// TODO: Match code to one sent via email, then activate users account
const ActivateAccountPage = () => {
    const navigate = useNavigate();
    const username = new URLSearchParams(useLocation().search).get("username");

    // method called to email user verification email
    Meteor.call("verify_email", username);

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>

            <div className="title-text text-center">Activate Your Account</div>

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
                        sent to your email to activate your account!
                    </div>
                </div>

                {/* TODO: Remove this div below once email activation has been implemented */}
                <div className={"main-text text-dark-grey mb-2.5"}>
                    **The email API has not been completed yet**
                </div>

                <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover  w-1/3 min-w-40"}
                        onClick={() => {
                            navigate("/login")
                        }}>
                    Return to Login
                </Button>
            </div>
        </WhiteBackground>
    );
};

export default ActivateAccountPage;