/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import {CalendarDaysIcon, PencilIcon} from "@heroicons/react/24/outline"

import Card from "./Card";
import Button from "../button/Button";

/**
 * Component that displays brief service details on the Services page
 *
 * @param className {string} - additional classes to be applied on top of the base style
 * @param serviceId {int} - id of the service (used for routing)
 * @param serviceName {string} - name of service
 * @param serviceDesc {string} - description of service
 * @param servicePrice {int} - price of the service
 * @param serviceImageData - service's cover image data from database
 * @param artistUsername {string} - Username (e.g. alice_tran1234) of artist that posted the service
 * @param artistAlias {string} - name of artist that posted the service
 * @param isEdit {boolean} - true for "edit service" button, false or null for "view service" button
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
                                isEdit,
                            }) => {

    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames(className, "flex flex-col justify-between w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-56");

    // set button style depending on whether isEdit mode or not
    let viewOrEditButton = "";
    let buttonClasses = "";
    let mainButton = null;

    const buttonBaseClasses = "flex flex-row gap-x-2 justify-center items-center w-4/5 lg:w-1/2 min-w-40";
    if (isEdit) {
        viewOrEditButton = "Edit Service";
        mainButton = (
            <Button className={buttonBaseClasses}
                    onClick={() => navigateTo('/services/' + serviceId + '/edit')}>
                <PencilIcon className="icon-base"/>
                {viewOrEditButton}
            </Button>
        )
    } else {
        viewOrEditButton = "View Service";
        buttonClasses = classNames("bg-secondary-purple hover:bg-secondary-purple-hover", buttonBaseClasses);
        mainButton = (
            <Button className={buttonClasses}
                    onClick={() => navigateTo('/services/' + serviceId)}>
                <CalendarDaysIcon className="icon-base"/>
                {viewOrEditButton}
            </Button>
        )
    }

    return (
        <Card className={classes}>
            <div className={"flex flex-row gap-x-8 justify-center"}>
                <div className={"cursor-default"}>
                    <div className="large-text text-our-black max-w-full break-all line-clamp-1 mb-3 text-center">
                        {serviceName}</div>
                    <div className="small-text text-dark-grey max-h-[5.5rem] max-w-full line-clamp-4 mb-3 break-words">
                        {serviceDesc}</div>
                    {/*only display the artist information if it isnt in edit mode (artist doenst need to see their own
                    information repeated on each service) */}
                    { isEdit ? null :
                        <div className="main-text text-dark-grey max-h-[1.5rem] max-w-full line-clamp-1 break-all">
                            Artist: {artistAlias} ( @{artistUsername} )
                        </div>
                    }
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
                    <label className="main-text font-bold text-our-black line-clamp-1">${servicePrice.toFixed(2)}</label>
                </div>

                {/* button to specific booking detail page*/}
                {mainButton}

            </div>
        </Card>
    );
};

export default ServiceCard;