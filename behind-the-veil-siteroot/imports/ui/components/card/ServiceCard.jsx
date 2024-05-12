/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import {CalendarDaysIcon} from "@heroicons/react/24/outline"

import Card from "./Card";
import Button from "../button/Button";

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
export const ServiceCard = ({
                                className,
                                serviceId,
                                serviceName,
                                serviceDesc,
                                servicePrice,
                                serviceImageData,
                                artistUsername,
                                artistAlias,
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames(className, "flex flex-col justify-between w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-56");

    return (
        <Card className={classes}>
            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3 text-center">
                        {serviceName}</div>
                    <div className="small-text text-dark-grey max-h-[4.5rem] max-w-full line-clamp-4 mb-3 break-all">
                        {serviceDesc}</div>
                    <div className="main-text text-dark-grey max-h-[1.5rem] max-w-full line-clamp-1 break-all">
                        Artist: {artistAlias} ( @{artistUsername} )
                    </div>
                </div>

                {/* image on the right side for service*/}
                <div className={"hidden sm:flex flex-col items-center justify-center " +
                    "relative min-w-40 min-h-40"}>
                    <img className={"w-full h-3/4 object-cover absolute rounded-[20px]"}
                         src={serviceImageData}
                         alt={"Service's cover image"}/>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 justify-center items-center">
                <div className="border-2 border-dashed border-dark-grey py-2 px-4 rounded-full w-4/5 lg:w-1/4 min-w-32
                flex items-center justify-center">
                    <label className="main-text font-bold text-our-black">${servicePrice}</label>
                </div>

                {/* button to specific booking detail page*/}
                <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 lg:w-1/2 min-w-40
                bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                        onClick={() => navigateTo('/service/' + serviceId)}>
                    <CalendarDaysIcon className="size-6 stroke-2"/>
                    View Service
                </Button>
            </div>
        </Card>
    );
};

export default ServiceCard;