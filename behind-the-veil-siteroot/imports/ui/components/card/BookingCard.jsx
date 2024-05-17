/**
 * File Description: Booking card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Laura
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import Card from "./Card";
import Button from '../button/Button';
import {DocumentMagnifyingGlassIcon} from "@heroicons/react/24/outline"

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
                                bookingStatus
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames("flex flex-col overflow-hidden justify-between " +
        "w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-[330px] pr-6 md:pr-0 lg:pr-6 xl:pr-0", className);

    return (
        <Card className={classes}>
            <div className={"flex flex-row gap-x-4 justify-center"}>
                <div className={"cursor-default px-4"}>

                    {/* displaying booking information */}
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                        {serviceName}</div>
                    <div className="medium-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                        {bookingStatus}</div>

                    <div className="flex flex-row justify-between">
                        <div className="medium-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                            {bookingStartDateTime}</div>
                        <div className="medium-text text-dark-grey max-w-full break-all line-clamp-1 mb-3 ml-auto">
                            ${servicePrice}</div>
                    </div>
                    <div className="small-text text-dark-grey max-h-[10rem] max-w-full line-clamp-4 mb-3 break-words">
                        {serviceDesc}</div>

                    {/*This is the buttons area on the bottom*/}
                    <div className="flex flex-col lg:flex-row gap-5 items-center">

                        {/* button for specific booking detail page */}
                        <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 lg:w-1/2 min-w-40 mt-5
                        bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                                onClick={() => navigateTo('/booking/' + bookingId)}>
                            <DocumentMagnifyingGlassIcon className="icon-base"/>
                            View Details
                        </Button>
                    </div>
                </div>

                {/* image on the right side */}
                {/*negative margin to counter the padding in the card*/}
                <div className={"hidden md:flex lg:hidden xl:flex -mt-6 relative min-w-56 h-full "}>
                    <img className={"w-full min-h-[350px] object-cover absolute"}
                         src={serviceImageData}
                         alt={"Service's cover image"}/>
                </div>
            </div>
        </Card>
    );
};

export default BookingCard;