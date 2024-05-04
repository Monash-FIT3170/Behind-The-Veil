/**
 * File Description: Calendar Popup examples
 * File version: 1.0
 * Contributors: Laura
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import {XCircleIcon} from "@heroicons/react/24/outline"

import Card from "../../components/card/Card";
import Button from "../../components/button/Button";

export const CalendarPopup = ({
                                isOpen, 
                                onClose,
                                className,
                                bookingId,
                                brideName,
                                bookingTime,
                                bookingLocation
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames(className, "flex flex-col justify-between w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-56");

    if (!isOpen) return null;
    return (
        <Card className={classes}>
            {/* close button */}
            <div
                className="fixed top-4 right-4 cursor-pointer transform hover:scale-110 transition-transform"
                onClick={onClose}
            >
                <XCircleIcon className="h-6 w-6 min-h-6 min-w-6"/>
            </div>

            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3 text-center">
                        {brideName}</div>
                    <div className="small-text text-dark-grey max-h-[4.5rem] max-w-full line-clamp-4 mb-3 break-all">
                        {bookingTime}</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                {/* button to specific booking detail page*/}
                <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 md:w-1/2 min-w-40
                bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                        onClick={() => navigateTo('/service/' + bookingId)}>
                    <XCircleIcon className="h-6 w-6 min-h-6 min-w-6"/>
                    View Service
                </Button>
            </div>
        </Card>
        

        
    );
};

export default CalendarPopup;