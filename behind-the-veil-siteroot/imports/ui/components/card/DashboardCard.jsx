/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 */

import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
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
  const navigateTo = useNavigate();

  const classes = classNames(className, "w-full lg:w-5/6");

  return (
    <Card className={classes}>
      <div className="flex flex-col grid grid-cols-3 place-items-center">
        <div className="col-span-2">
          <div className="large-text text-xs md:large-text text-sm 2xl:large-text text-wrap text-our-black max-w-full mb-3 text-center">
            {dashboardCardTitle}
          </div>
          <div className="small-text text-dark-grey max-h-[4.5rem] max-w-full line-clamp-4 mb-3 text-center">
            {dashboardCardDesc}
          </div>
        </div>
        <div className="large-text text-out-black text-center place-items-center 2xl:large-number-text">
          {dashboardCardValue}
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
