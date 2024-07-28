/**
 * File Description: Calendar popup content, i.e. what you see within the popup
 * File version: 1.0
 * Contributors: Laura, Josh
 */

import React from "react";
import BookingStatus from "../../enums/BookingStatus";
import { XCircleIcon, ClockIcon, MapPinIcon, DocumentMagnifyingGlassIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import Button from "../button/Button";

const CalendarPopupContent = ({
    bookingStatus,
    brideName,
    bookingTime,
    bookingLocation,
    onClose
}) => {

    return (
        <>
            {/* close button */}
            <div
                className="fixed top-4 right-4 cursor-pointer transform hover:scale-110 transition-transform"
                onClick={onClose}
            >
                <XCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
            </div>

            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 text-center">
                        {brideName}
                    </div>
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
                        onClick={() => { }}>
                        <CheckCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
                        Confirm
                    </Button>
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-white hover:bg-light-gray-hover border-light-gray border-2 transition duration-500"
                        onClick={() => { }}>
                        <XCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
                        Reject
                    </Button>
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                        onClick={() => navigateTo('/service/' + bookingId)}>
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6" />
                        View Details
                    </Button>
                </div>
            )}

            {bookingStatus === BookingStatus.CONFIRMED && (
                <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-white hover:bg-secondary-purple-hover border-light-gray border-2 transition duration-500"
                        onClick={() => { }}>
                        <XCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
                        Cancel Booking
                    </Button>
                    {/* button to specific booking detail page*/}
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                    bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                        onClick={() => navigateTo('/service/' + bookingId)}>
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6" />
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
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6" />
                        View Details
                    </Button>
                </div>
            )}
        </>
    )
}

export default CalendarPopupContent