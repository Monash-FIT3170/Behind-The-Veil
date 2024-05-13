/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import Card from "./Card";
import { BookingStatus } from '../../enums/BookingStatus';
import Button from '../button/Button';
import {DocumentMagnifyingGlassIcon} from "@heroicons/react/24/outline"

/**
 * Component that displays brief service details on the Services page
 *
 * @param className {string} additional classes to be applied on top of the base style
 * @param serviceId {int} id of the service (used for routing)
 * @param serviceName {string} name of service
 * @param serviceDesc {string} description of service
 * @param servicePrice {int} price of the service
 * @param serviceImageData service's cover image data from database
 * @param artistUsername {string} Username (e.g. alice_tran1234) of artist that posted the service
 * @param artistAlias {string} name of artist that posted the service
 */
export const BookingCard = ({
                                className,
                                bookingId,
                                serviceName,
                                serviceDesc,
                                servicePrice,
                                serviceImageData,
                                bookingTime,
                                bookingStatus
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames(className, "flex flex-col justify-between w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-56");

    return (
        <Card className={classes}>
            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                        {serviceName}</div>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                        {bookingStatus}</div>
                        <div className="flex">
                            <div className="medium-text text-our-black max-w-full break-all line-clamp-1 mb-3">
                                {bookingTime}
                            </div>
                            <div className="medium-text text-our-black max-w-full break-all line-clamp-1 mb-3 ml-auto">
                                {"$"}{servicePrice}
                            </div>
                        </div>
                    <div className="small-text text-dark-grey max-h-[4.5rem] max-w-full line-clamp-4 mb-3 break-all">
                        {serviceDesc}</div>
                    <div className="flex flex-col lg:flex-row gap-5 justify-center items-center">
                        {/* button to specific booking detail page*/}
                        <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 lg:w-1/2 min-w-40
                        bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                                onClick={() => navigateTo('/booking/' + bookingId)}>
                            <DocumentMagnifyingGlassIcon className="icon-base"/>
                            View Details
                        </Button>
                    </div>
                </div>

                {/* image on the right side for service*/}
                <div className={"hidden sm:flex flex-col items-center justify-center " +
                    "relative min-w-60 min-h-40"}>
                    <img className={"w-full h-3/4 object-cover absolute rounded-[20px]"}
                        src={serviceImageData}
                        alt={"Service's cover image"}/>
                </div>
            </div>
        </Card>
    );
};

export default BookingCard;