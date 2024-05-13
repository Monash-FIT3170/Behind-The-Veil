/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 */

import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import Card from "./Card";
import Button from "../button/Button";

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

  const classes = classNames(
    className,
    "flex flex-col justify-between w-full min-w-60 lg:w-2/5 lg:min-w-78 min-h-56"
  );

  return (
    <Card className={classes}>
      <div className="flex-auto grid grid-cols-3">
        <div className="col-span-2">
          <div className="large-text text-our-black max-w-full line-clamp-1 mb-3 text-center">
            {dashboardCardTitle}
          </div>
          <div className="small-text text-dark-grey max-h-[4.5rem] max-w-full line-clamp-4 mb-3 text-center">
            {dashboardCardDesc}
          </div>
        </div>
        <div className="large-number-text text-out-black text-center">
          {dashboardCardValue}
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
