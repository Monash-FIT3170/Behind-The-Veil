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
import ProfilePhoto from "../profilePhoto/ProfilePhoto";

/**
 * Component that displays brief service details on the Services page
 *
 * @param className {string} additional classes to be applied on top of the base style
 * @param serviceId {int} id of the service (used for routing)
 * @param serviceName {string} name of service
 * @param serviceDesc {string} description of service
 * @param servicePrice {int} price of the service
 * @param artistId {int} Id of artist that posted the service
 * @param artistName {string} name of artist that posted the service
 * @param artistPhotoData artist profile photo's data from database
 */
export const ServiceCard = ({
                                className,
                                serviceId,
                                serviceName,
                                serviceDesc,
                                servicePrice,
                                artistId,
                                artistName,
                                artistPhotoData,

                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames(className, "flex flex-col w-full min-w-60 lg:w-2/5 lg:min-w-78");

    return (
        <Card className={classes}>
            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="main-text text-our-black max-w-full break-all line-clamp-1 mb-3 text-center
                    ">{serviceName}</div>
                    <div className="small-text text-dark-grey max-h-[4.5rem] max-w-full line-clamp-4 break-all
                    ">{serviceDesc}</div>
                </div>

                {/* clickable to navigate to artist profile*/}
                <div className={"hidden sm:flex flex-col items-center justify-center cursor-pointer min-w-20"}
                     onClick={() => navigateTo('/artists/' + artistId)}
                >
                    <ProfilePhoto artistPhotoData={artistPhotoData}></ProfilePhoto>
                    <div className="max-h-[4rem] large-text text-our-black line-clamp-2 text-center">{artistName}</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                <div className="border-2 border-dashed border-dark-grey py-2 px-4 rounded-full w-3/5 md:w-1/4 min-w-32
                flex items-center justify-center">
                    <label className="main-text font-bold text-our-black">${servicePrice}</label>
                </div>

                {/* button to specific booking detail page*/}
                <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 md:w-1/2 min-w-40
                bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                        onClick={() => navigateTo('/service/' + serviceId)}
                >
                    <CalendarDaysIcon className="h-6 w-6 min-h-6 min-w-6"/>
                    View Service
                </Button>
            </div>
        </Card>
    );
};

export default ServiceCard;