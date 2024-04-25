/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Josh
 */

import React from 'react';
import classNames from "classnames";

import {CalendarDaysIcon} from "@heroicons/react/24/outline"

import Card from "./Card";
import Button from "../button/Button";

/**
 * A type of card, but specific for service information
 * @returns {JSX.Element}
 * @constructor
 */
export const ServiceCard = ({className, serviceName, serviceDesc, servicePrice, artistName, artistPhoto, serviceId}) => {
    // todo: fake info
    const classes = classNames("service-details-header-base", className)

    return (
        <Card className="flex flex-col w-full lg:w-2/5">
            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div>
                    <span className="main-text text-our-black">{serviceName}</span>
                    <br/>
                    <span className="small-text text-dark-grey max-h-15 overflow-y-hidden">
                    {serviceDesc}</span>
                </div>
                <div className={"hidden sm:flex flex-col items-center justify-center cursor-pointer"}>
                    <span className="main-text text-our-black">{artistPhoto}</span>
                    <br/>
                    <span className="large-text text-our-black">{artistName}</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                <div className="border-2 border-dashed border-dark-grey py-2 px-4 rounded-full w-4/5 md:w-1/3
                flex items-center justify-center">
                    <label className="main-text font-bold text-our-black">${servicePrice}</label>
                </div>
                <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 md:w-1/3
                bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500">
                    <CalendarDaysIcon className="h-6 w-6 min-h-6 min-w-6"/>
                    Request Booking
                </Button>
            </div>
        </Card>
    );
};

export default ServiceCard;