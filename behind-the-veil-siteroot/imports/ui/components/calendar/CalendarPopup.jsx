/**
 * File Description: Calendar Popup examples
 * File version: 1.0
 * Contributors: Laura
 */

import React, {useState, useEffect, useRef} from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import {XCircleIcon, ClockIcon, MapPinIcon, DocumentMagnifyingGlassIcon, CheckCircleIcon} from "@heroicons/react/24/outline"

import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { BookingStatus } from "../../enums/BookingStatus"
import { useFloating, useInteractions } from "@floating-ui/react";

export const CalendarPopup = ({
                                isOpen, 
                                onClose,
                                className,
                                bookingId,
                                brideName,
                                bookingTime,
                                bookingLocation,
                                bookingStatus,
                                buttonRef
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();
    const ref = useRef(null)
    const [height, setHeight] = useState(0)
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const classes = classNames(className, "flex flex-col justify-between");

    const { floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: onClose
    });

    const {
        getReferenceProps,
        getFloatingProps
    } = useInteractions([context]);
    
    useEffect(() => {
    if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setLeft(buttonRect.left);
        setTop(buttonRect.bottom);
    }
    }, [buttonRef]);

    useEffect(() => {
    if (buttonRef.current && ref.current) {
        const left = isPopupOnRight 
        ? buttonRef.current.offsetLeft - ref.current.offsetWidth - 10
        : buttonRef.current.offsetLeft - ref.current.offsetWidth - 10;
        setLeft(left);
    }
    }, [buttonRef]);

    if (!isOpen) return null;
    return (
        <Card className={classes} style={{ 
            ...floatingStyles,
            position: "absolute",
            left: left,
            top: top
        }}>
            {/* close button */}
            <div    
                className="fixed top-4 right-4 cursor-pointer transform hover:scale-110 transition-transform"
                onClick={onClose}
            >
                <XCircleIcon className="h-6 w-6 min-h-6 min-w-6"/>
            </div>

            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 text-center">
                        {brideName}</div>
                </div>
            </div>

            <hr />

            <div className={"flex flex-col gap-x-8 justify-center items-center"}>
                <div className={"cursor-default flex items-center gap-x-2"}>
                    <ClockIcon className="h-6 w-6 min-h-6 min-w-6 mb-3"></ClockIcon>
                    <div className="main-text text-our-black max-w-full break-all line-clamp-1 mb-3 text-center">
                        {bookingTime}
                    </div>
                </div>
                <div className={"cursor-default flex items-center gap-x-2"}>
                    <MapPinIcon className="h-6 w-6 min-h-6 min-w-6 mb-3"></MapPinIcon>
                    <div className="main-text text-our-black max-w-full break-all line-clamp-1 mb-3 text-center">
                        {bookingLocation}
                    </div>
                </div>
            </div>

            {bookingStatus === BookingStatus.PENDING && (
                <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-light-gray hover:bg-secondary-purple-hover transition duration-500"
                        onClick={() => {}}>
                        <CheckCircleIcon className="h-6 w-6 min-h-6 min-w-6"/>
                        Confirm
                    </Button>
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-white hover:bg-light-gray-hover border-light-gray border-2 transition duration-500"
                            onClick={() => {}}>
                        <XCircleIcon className="h-6 w-6 min-h-6 min-w-6"/>
                        Reject
                    </Button>
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                            onClick={() => navigateTo('/service/' + bookingId)}>
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6"/>
                        View Details
                    </Button>
                </div>
            )}

            {bookingStatus === BookingStatus.CONFIRMED && (
                <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-white hover:bg-secondary-purple-hover border-light-gray border-2 transition duration-500"
                            onClick={() => {}}>
                        <XCircleIcon className="h-6 w-6 min-h-6 min-w-6"/>
                        Cancel Booking
                    </Button>
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                            onClick={() => navigateTo('/service/' + bookingId)}>
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6"/>
                        View Details
                    </Button>
                </div>
            )}

            {bookingStatus === BookingStatus.PENDING_CANCELLATION && (
                <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                            onClick={() => navigateTo('/service/' + bookingId)}>
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6"/>
                        View Details
                    </Button>
                </div>
            )}
        </Card>
        

        
    );
};

export default CalendarPopup;