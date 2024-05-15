/**
 * File Description: Card examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Card from "../../card/Card";
import Button from "../../button/Button";
import classNames from "classnames";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline"


const serviceMock = [
    {
        serviceID: "serving",
        serviceType: "makeup",
        serviceName: "lovydovy",
        serviceDesc: "imma put on some makeup real good but i need more text in here because the description is probs gonna ba a whole paragraph"

    },
    {
        serviceID: "some other string",
        serviceType: "makeup but not",
        serviceName: "lovydovy rorororoor",
        serviceDesc: "imma put on some makeup real good"

    },
    {
        serviceID: "some string other",
        serviceType: "makeup lalalala",
        serviceName: "lovydovy erararfaer",
        serviceDesc: "imma put on some makeup real good"

    }

]

export const BridesBookingCards = ({className, status, elements}) => {
    const classes = classNames("brides-profile-page-booking-card-base", className)
    let thisService = "";
    for (let service of serviceMock) {
        if (service.serviceID === status.serviceID) {
            thisService = service;
        }
    }
    return (
        
        <Card className={classes}>
            <div className="col-span-2 p-6" >
                <div className="text-space-brides-profile-page-booking-card-base ">
                    <div className="col-span-2 ">
                        <div className="large-text text-our-black max-w-full break-all line-clamp-1 col-span-2">{thisService.serviceName}</div>
                        <div className={elements.statusStyle}>
                            {elements.statusIcon}
                            {elements.status}
                            <QuestionMarkCircleIcon className="icon-base w-5 h-5"/>
                        </div>
                    </div>
                    <div className="pt-3">{status.bookingStartDate}</div>
                    <div className="pt-3 flex flex-row gap-x-2 justify-center items-center w-4/5 lg:w-1/2 min-w-60">{status.bookingPrice}</div>
                    <div className="small-text text-dark-grey max-h-[4.5rem] max-w-120 line-clamp-4 break-all col-span-2 row-span-2">{thisService.serviceDesc}</div>
                        <Button className="col-span-2 flex flex-row gap-x-2 justify-center items-center w-4/5 lg:w-1/2 min-w-60 bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500" 
                        onClick={() => navigateTo('/service/' + serviceId)}>{elements.buttonIcon}{elements.buttonText}
                        </Button>
                    
                </div>
            </div>
            <div>
                <div>
                <img
                className=" border-2 h-60 w-fit rounded-r-[45px] p-0 text-end"
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
              />
                </div>
            </div>
            
        </Card>
    );
};

export default BridesBookingCards;


