/**
 * File Description: Calendar popup content, i.e. what you see within the popup
 * File version: 1.0
 * Contributors: Laura, Josh
 */

import React from "react";
import BookingStatus from "../../enums/BookingStatus";
import { XCircleIcon, ClockIcon, MapPinIcon, DocumentMagnifyingGlassIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

/**
 * Button to go to specific booking detail page
 * @param bookingId booking ID of the booking page to go to
 */
const ViewDetailsButton = ({ bookingId }) => {
    const navigateTo = useNavigate();

    return (
        <Button
            className="flex flex-row gap-x-2 justify-center items-center
                    bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
            onClick={() => navigateTo('/booking/' + bookingId)}
        >
            <DocumentMagnifyingGlassIcon className="h-6 w-6 min-h-6 min-w-6" />
            View Details
        </Button>
    )
}

/**
 * Component that contains the content of the calendar popup. Displays brief info + buttons.
 * 
 * @param bookingId id of booking (used for routing)
 * @param bookingStatus current booking status
 * @param brideName bride name (used for popup title)
 * @param bookingTime formatted booking time string
 * @param bookingLocation location of booking
 * @param onClose close handler callback
 */
const CalendarPopupContent = ({
    bookingId,
    bookingStatus,
    brideName,
    bookingTime,
    bookingLocation,
    onClose
}) => {
    const navigateTo = useNavigate();
    return (
        <>
            {/* close button */}
            <div
                className="fixed top-4 right-4 cursor-pointer transform hover:scale-110 transition-transform"
                onClick={onClose}
            >
                <XCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
            </div>

            <div className="flex flex-row gap-x-8 justify-center">
                <div className="cursor-default">
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 text-center">
                        {brideName}
                    </div>
                </div>
            </div>

            <hr />

            <div className="flex flex-col gap-y-3 justify-center items-center py-2">
                <div className="flex items-center gap-x-2">
                    <ClockIcon className="icon-base stroke-1 stroke-dark-grey" />
                    <div className="text-dark-grey max-w-full break-all line-clamp-1 text-center">
                        {bookingTime}
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <MapPinIcon className="icon-base stroke-1 stroke-dark-grey" />
                    <div className="text-dark-grey max-w-full break-all line-clamp-1 text-center">
                        {bookingLocation}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 justify-center items-center">

                {bookingStatus === BookingStatus.PENDING && (
                    <>
                        <Button className="flex flex-row gap-x-2 justify-center items-center
                            bg-light-gray hover:bg-secondary-purple-hover transition duration-500"
                            onClick={() => { }}
                        >
                            <CheckCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
                            Confirm
                        </Button>
                        <Button className="flex flex-row gap-x-2 justify-center items-center
                            bg-white hover:bg-light-gray-hover border-light-gray border-2 transition duration-500"
                            onClick={() => { }}
                        >
                            <XCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
                            Reject
                        </Button>
                    </>
                )}

                {bookingStatus === BookingStatus.CONFIRMED && (
                    <Button className="flex flex-row gap-x-2 justify-center items-center
                            bg-white hover:bg-secondary-purple-hover border-light-gray border-2 transition duration-500"
                            onClick={() => navigateTo('/cancel-booking/' + bookingId)}
                    >
                        <XCircleIcon className="h-6 w-6 min-h-6 min-w-6" />
                        Cancel Booking
                    </Button>
                )}

                <ViewDetailsButton bookingId={bookingId} />
            </div>
        </>
    )
}

export default CalendarPopupContent