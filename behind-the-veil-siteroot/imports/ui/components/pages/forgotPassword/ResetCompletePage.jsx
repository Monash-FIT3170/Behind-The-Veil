/**
 * File Description: Forget password: Reset complete page
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import {useNavigate} from "react-router-dom";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";

/**
 * Page that confirms user their password has been changed
 */
export const ResetCompletePage = () => {

    const navigate = useNavigate();

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
            <div className={"flex flex-col items-center justify-center gap-y-5"}>
            <span className="text-center title-text mb-5">
                Password Changed!
            </span>
                <CheckCircleIcon className={"size-32 stroke-[1] text-confirmed-colour"}></CheckCircleIcon>
                <span className="text-center large-text text-dark-grey">
                Your password has been successfully changed!
            </span>
                <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40 mt-5"}
                        onClick={() => {
                            navigate('/login')
                        }
                        }>Return to Login</Button>
            </div>
        </WhiteBackground>
    );
};

export default ResetCompletePage;