/**
 * File Description: Booking confirmation page
 * File version: 1.0
 * Contributors: Neth
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import {CheckCircleIcon, CheckIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

/**
 * * Component for displaying a booking confirmation message.
 *  *
 *  * This component shows a confirmation message when a payment is completed,
 *  * along with a receipt number. It provides a button to navigate back to the
 *  * user's account page.
 *
 * @returns {JSX.Element} PaymentDetails component.
 */
const BookingConfirmation = () => {
    const navigateTo = useNavigate();

    /**
     * Function to navigate the user back to their account page.
     */
    const returnToAccount = () => {
        navigateTo(`/bride-profile/:username`);
    }

    return (
        <WhiteBackground className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
                <div className="title-text text-center">Payment Completed</div>
                <CheckCircleIcon className="w-[85px] text-confirmed-colour"/>
                <div className={"main-text text-dark-grey"}>
                    <p className="">Your payment has been processed.</p>
                    <p className="">Thank you for using Behind the Veil!</p>
                </div>
                <div className="flex flex-row gap-4 mt-6">
                    <span className="main-text text-dark-grey">Receipt Number:</span>
                    <span className="flex main-text items-center justify-center">X219061084912321</span>
                </div>
                <Button className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1 mt-10" onClick={returnToAccount}>
                    <CheckIcon className="icon-base" />
                    Return to account
                </Button>
            </div>
        </WhiteBackground>
    );
};

export default BookingConfirmation;
