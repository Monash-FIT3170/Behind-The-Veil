/**
 * File Description: Email verification page
 * Contributors: Nikki
 * Version: 1.0
 */

import PageLayout from "../../../enums/PageLayout";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";

import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Accounts} from "meteor/accounts-base";
import {getUserInfo} from "../../util";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import UrlBasePath from "../../../enums/UrlBasePath";
import Loader from "../../loader/Loader";

/**
 * Email verification page component
 */
export const EmailVerifyPage = () => {
    const navigate = useNavigate();

    // token to verify email
    const {token} = useParams();

    // if loading verify status
    const [loading, setLoading] = React.useState(true);

    // get user information
    const userInfo = getUserInfo();

    // meteor method to verify a token
    Accounts.verifyEmail(
        token,
        function (error) {
            setLoading(false);
        });

    if (loading) {
        return (
            <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
                <Loader
                    loadingText={"loading . . ."}
                    isLoading={loading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );
    } else {
        if (!userInfo.emailVerified) {
            return (
                <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
                    <div className="title-text text-center">Email Verification Failed</div>

                    <div className={"flex flex-col gap-y-6 items-center justify-center"}>
                        <XCircleIcon className={"text-cancelled-colour stroke-1.5 size-32"}/>
                        <span className={"main-text"}>Invalid email verification token</span>
                        <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover"}
                                onClick={() => {
                                    navigate('/login')
                                }}>
                            Return to Login
                        </Button>
                    </div>
                </WhiteBackground>
            )
        } else {
            return (
                <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
                    <div className="title-text text-center">Email Verified</div>

                    <div className={"flex flex-col gap-y-6 items-center justify-center"}>
                        <CheckCircleIcon className={"text-confirmed-colour stroke-1.5 size-32"}/>
                        <span className={"main-text"}>Your email is verified!</span>
                        <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover"}
                                onClick={() => {
                                    navigate('/' + UrlBasePath.PROFILE)
                                }}>
                            Return to Profile
                        </Button>
                    </div>
                </WhiteBackground>
            )
        }
    }
}

export default EmailVerifyPage;