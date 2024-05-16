/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 */

import React from "react";
import classNames from "classnames";
import Card from "./Card";

/**
 * Component that displays brief service details on the Services page
 *
 * @param className {string} additional classes to be applied on top of the base style
 * @param dashboardCardTitle {int} id of the service (used for routing)
 * @param dashboardCardDesc {string} name of service
 * @param dashboardCardValue {string} description of service
 */
export const DashboardCard = ({
                                  className,
                                  dashboardCardTitle,
                                  dashboardCardDesc,
                                  dashboardCardValue,
                              }) => {
    // variables to handle routing
    const classes = classNames(className,
        "flex flex-col justify-center items-center gap-x-8 cursor-default " +
        "sm:flex-row sm:grid sm:grid-cols-5 " +
        "lg:flex-col lg:grid-cols-none " +
        "xl:flex-row xl:grid xl:grid-cols-5 " +
        "w-full min-w-60 lg:w-2/5 lg:min-w-[300px] min-h-48");

    return (
        <Card className={classes}>

            <div className="flex flex-col w-fit max-w-[250px] h-fit
            col-span-full sm:col-span-3 lg:col-span-full lg:w-full xl:col-span-3 xl:w-fit">
                <div
                    className="large-text text-wrap text-our-black max-w-full mb-3 text-center">
                    {dashboardCardTitle}
                </div>
                <div className="small-text text-dark-grey max-h-[5.5rem] max-w-full line-clamp-4 mb-3 text-center">
                    {dashboardCardDesc}
                </div>
            </div>

            <div className="text-our-black text-center large-number-text w-fit min-w-1/4 break-all line-clamp-1
            col-span-full sm:col-span-2 lg:col-span-full lg:w-full xl:col-span-2 xl:w-fit">
                {dashboardCardValue}
            </div>
        </Card>
    );
};

export default DashboardCard;
