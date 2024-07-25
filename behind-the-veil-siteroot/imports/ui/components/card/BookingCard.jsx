/**
 * File Description: Booking card component based on the generic "Card" component
 * File version: 1.2
 * Contributors: Laura, Nikki
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import Card from "./Card";
import Button from '../button/Button';
import {
    ArrowPathIcon,
    CurrencyDollarIcon,
    DocumentMagnifyingGlassIcon,
    PencilSquareIcon,
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
 * @param servicePrice {int} price of the service
 * @param serviceImageData service's cover image data from database
 * @param bookingStartDateTime {string} booking start date and time
 * @param bookingStatus {BookingStatus} current booking status
 */
export const BookingCard = ({
                                className,
                                bookingId,
                                serviceName,
                                serviceDesc,
                                servicePrice,
                                serviceImageData,
                                bookingStartDateTime,
                                bookingStatus,
                                userType
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames("flex flex-col overflow-hidden justify-between " +
        "w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-[330px] pr-6 md:pr-0 lg:pr-6 xl:pr-0", className);

    let additionalButtons = [];
    const buttonClass = "flex flex-row gap-x-2 justify-center items-center w-4/5 min-w-40 " +
        "bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500";

    if (userType === 'bride') {
        // todo: once the status component is completed, add it here
        // todo: once bookings are actual do more logic for the buttons such as checking dates, if reviewed, etc

        switch (bookingStatus) {
            case BookingStatus.COMPLETED:
                // if booking is completed, add a "Leave review" or "View review" button
                if (true) { // todo: check if review has been written
                    // if has not yet left review
                    additionalButtons.push(
                        <Button className={buttonClass}>
                            <PencilSquareIcon className="icon-base"/>
                            Leave Review
                        </Button>
                    );
                } else {
                    // if already left review
                    additionalButtons.push(
                        <Button className={buttonClass}>
                            <DocumentMagnifyingGlassIcon className="icon-base"/>
                            View Review
                        </Button>
                    );
                }
                break;
            case BookingStatus.CONFIRMED:
                // if booking is confirmed add a "service completed" button if over the date
                // if a booking is confirmed, add a "request change" button if not yet the date
                if (true) { // todo check and compare service date with today
                    // if today or passed today
                    additionalButtons.push(
                        <Button className={buttonClass}>
                            <CurrencyDollarIcon className="icon-base"/>
                            Service Completed
                        </Button>
                    );
                } else {
                    // if booking date has not passed yet
                    additionalButtons.push(
                        <Button className={buttonClass}>
                            <ArrowPathIcon className="icon-base"/>
                            Request change
                        </Button>
                    );
                }
                break;
            case BookingStatus.PENDING:
                // if a booking is pending, add a "request change" button
                additionalButtons.push(
                    <Button className={buttonClass}>
                        <ArrowPathIcon className="icon-base"/>
                        Request change
                    </Button>
                );
                break;
        }

    } else if (userType === 'artist') {
        // todo
    }
    return (
        <Card className={classes}>
            <div className={"flex flex-row gap-x-4 justify-center"}>
                <div className={"cursor-default px-4"}>

                    {/* displaying booking information */}
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                        {serviceName}</div>
                    <BookingStatusDisplay bookingStatus={bookingStatus} />

                    <div className="flex flex-row justify-between">
                        <div className="medium-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                            {bookingStartDateTime}</div>
                        <div className="medium-text text-dark-grey max-w-full break-all line-clamp-1 mb-3 ml-auto">
                            ${servicePrice.toFixed(2)}</div>
                    </div>
                    <div className="small-text text-dark-grey max-h-[10rem] max-w-full line-clamp-4 mb-3 break-words">
                        {serviceDesc}</div>

                    {/*This is the buttons area on the bottom*/}
                    <div className="flex flex-col gap-2 items-center mt-5">

                        {/* button for specific booking detail page */}
                        <Button className={classNames(buttonClass)}
                                onClick={() => navigateTo('/booking/' + bookingId)}>
                            <DocumentMagnifyingGlassIcon className="icon-base"/>
                            View Details
                        </Button>

                        {/*additional buttons which depends on status/user type*/}
                        {additionalButtons}

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