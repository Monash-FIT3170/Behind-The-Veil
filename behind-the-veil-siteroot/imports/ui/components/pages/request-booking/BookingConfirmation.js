import React, {useId, useState} from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {CheckCircleIcon, CheckIcon} from "@heroicons/react/24/outline";

const BookingConfirmation = () => {

    return (
        <WhiteBackground className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
                <div className="title-text text-center">Payment Completed</div>
                <CheckCircleIcon className="w-[85px] text-confirmed-colour"/>
                <div>
                    <p className="text-dark-grey">Your payment has been processed.</p>
                    <p className="text-dark-grey">Thank you for using Behind the Veil!</p>
                </div>
                <div className="flex flex-row gap-4 mt-6">
                    <span className="text-dark-grey">Receipt Number:</span>
                    <span className="flex items-center justify-center">X219061084912321</span>
                </div>
                <Button className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1 mt-10">
                    <CheckIcon className="icon-base" />
                    Return to account
                </Button>
            </div>
        </WhiteBackground>
    );
};

export default BookingConfirmation;