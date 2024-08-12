/**
 * File Description: Booking card component based on the generic "Card" component
 * File version: 1.4
 * Contributors: Laura, Nikki
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import Card from "./Card";
import Button from '../button/Button';
import {
    ArrowPathIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    DocumentMagnifyingGlassIcon,
    EyeIcon,
    PencilSquareIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline"
import BookingStatus from "../../enums/BookingStatus";
import BookingStatusDisplay from "../booking/BookingStatusDisplay";


/**
 * Component that displays brief booking details
 *
 * @param className {string} additional classes to be applied on top of the base style
 * @param bookingId {int} id of the service (used for routing)
 * @param serviceName {string} name of service
 * @param serviceDesc {string} description of service
 * @param bookingPrice {int} price of the service at the time of booking
 * @param serviceImageData service's cover image data from database
 * @param bookingStartDateTime {string} booking start date and time
 * @param bookingStatus {BookingStatus} current booking status
 * @param bookingIsReviewed {boolean} if the booking has been reviewed
 * @param userType {string} type of the current user
 * @param cardProps encompasses all other props supplied and applies them to the card
 */
export const BookingCard = ({
                                className,
                                bookingId,
                                serviceName,
                                serviceDesc,
                                bookingPrice,
                                serviceImageData,
                                bookingStartDateTime,
                                bookingStatus,
                                bookingIsReviewed,
                                userType,
                                ...cardProps
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    // date objects to compare dates
    const bookingDatetime = new Date(bookingStartDateTime);
    const now = new Date();

    const classes = classNames("flex flex-col overflow-hidden justify-between " +
        "w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-[330px] pr-6 md:pr-0 lg:pr-6 xl:pr-0", className);

    let additionalButtons = [];
    const buttonClass = "flex flex-row gap-x-2 justify-center items-center w-4/5 min-w-40 "
    const purpleButtonClass = classNames(buttonClass, "bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500");


    if (userType === 'bride') {
        switch (bookingStatus) {
            case BookingStatus.COMPLETED:
                // if booking is completed, add a "Leave review" or "View review" button
                if (bookingIsReviewed) {
                    // if not reviewed yet
                    additionalButtons.push(
                        <Button className={purpleButtonClass}>
                            <PencilSquareIcon className="icon-base"/>
                            Leave Review
                        </Button>
                    );
                } else {
                    // if already left review
                    additionalButtons.push(
                        <Button className={purpleButtonClass}>
                            <EyeIcon className="icon-base"/>
                            View Review
                        </Button>
                    );
                }
                break;
            case BookingStatus.CONFIRMED:
                // if booking is confirmed add a "service completed" button if over the date
                // if a booking is confirmed, add a "request change" button if not yet the date
                if (bookingDatetime >= now) { // checks that service date is after now
                    // if today or passed today
                    additionalButtons.push(
                        <Button className={purpleButtonClass}>
                            <CurrencyDollarIcon className="icon-base"/>
                            Service Completed
                        </Button>
                    );
                } else {
                    // if booking date has not passed yet
                    additionalButtons.push(
                        <Button className={purpleButtonClass}>
                            <ArrowPathIcon className="icon-base"/>
                            Request change
                        </Button>
                    );
                }
                break;
            case BookingStatus.PENDING:
                // if a booking is pending, add a "request change" button
                additionalButtons.push(
                    <Button className={purpleButtonClass}>
                        <ArrowPathIcon className="icon-base"/>
                        Request change
                    </Button>
                );
                break;
        }

    } else if (userType === 'artist') {
        switch (bookingStatus) {
            case BookingStatus.PENDING:
                // if a booking is pending, add "accept" and "reject" buttons
                additionalButtons.push(
                    <Button className={purpleButtonClass}>
                        <CheckCircleIcon className="icon-base"/>
                        Accept
                    </Button>
                );
                additionalButtons.push(
                    <Button className={purpleButtonClass}>
                        <XCircleIcon className="icon-base"/>
                        Reject
                    </Button>
                );
                break;
            case BookingStatus.CONFIRMED:
                // if a booking is confirmed, add "cancel" button
                additionalButtons.push(
                    <Button className={purpleButtonClass}
                        onClick={() => navigateTo('/cancel-booking')}>
                        <XCircleIcon className="icon-base"/>
                        Cancel
                    </Button>
                );
                break;
            case BookingStatus.OVERDUE:
                // if a booking is confirmed, add "cancel" button
                additionalButtons.push(
                    <Button className={purpleButtonClass}
                        onClick={() => navigateTo('/cancel-booking')}>
                        <XCircleIcon className="icon-base"/>
                        Cancel
                    </Button>
                );
                break;
        }
    }

    return (
        <Card className={classes} {...cardProps}>
            <div className={"flex flex-row gap-x-4 justify-center"}>
                <div className={"cursor-default px-4"}>

                    {/* displaying booking information */}
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                        {serviceName}</div>
                    <BookingStatusDisplay bookingStatus={bookingStatus}/>

                    <div className="flex flex-row justify-between">
                        <div className="medium-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                            {bookingDatetime.toLocaleString()}</div>
                        <div className="medium-text text-dark-grey max-w-full break-all line-clamp-1 mb-3 ml-auto">
                            ${bookingPrice.toFixed(2)}</div>
                    </div>
                    <div className="small-text text-dark-grey max-h-[10rem] max-w-full line-clamp-4 mb-3 break-words">
                        {serviceDesc}</div>

                    {/*This is the buttons area on the bottom*/}
                    <div className="flex flex-col gap-2 items-center mt-5">
                        {/*additional buttons which depends on status/user type*/}
                        {additionalButtons}

                        {/* button for specific booking detail page */}
                        <Button className={classNames(buttonClass)}
                                onClick={() => navigateTo('/booking/' + bookingId)}>
                            <DocumentMagnifyingGlassIcon className="icon-base"/>
                            View Details
                        </Button>

                    </div>
                </div>

                {/* image on the right side */}
                {/*negative margin to counter the padding in the card*/}
                <div className={"hidden md:flex lg:hidden xl:flex -mt-6 relative min-w-56 h-full"}>
                    <img className={"w-full object-cover absolute min-h-[400px]"}
                         onError={({currentTarget}) => {
                             currentTarget.onError = null; // prevent infinite loop
                             currentTarget.src = '/imageNotFound.png';
                         }}
                         src={serviceImageData}
                         alt={"Service's cover image"}/>
                </div>
            </div>
        </Card>
    );
};

export default BookingCard;