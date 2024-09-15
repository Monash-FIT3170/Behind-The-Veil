/**
 * File Description: Service details header component
 * File version: 1.1
 * Contributors: Josh, Nikki
 */

import React from "react";
import classNames from "classnames";
import Card from "../card/Card";

/**
 * Component that displays service details, i.e. service, date, artist, price
 * @param {string} className - Additional classes to be applied on top of the base style
 * @param {string} service - Name of service
 * @param {string} date - Date of service performed
 * @param {string} type - Type of the service
 * @param {string} artist - Name of artist providing service
 * @param {string} price - Price of service
 * // TODO: may need to refactor props once the database schema is set up
 */
const ServiceDetailsHeader = ({ className, service, date, type, artist, price }) => {
  const classes = classNames("service-details-header-base", className)
  return (
    <Card className={classes}>
      <div>
        <div className="main-text text-dark-grey">Service</div>
        <div className="main-text text-our-black">{service}</div>
      </div>
      <div>
        {/* prioritises displaying the date if given, or else displays the Type, if both are null, display empty*/}
        <div className="main-text text-dark-grey">{date ? "Date" : type ? "Type" : ""}</div>
        <div className="main-text text-our-black">{date ? date : type ? type : ""}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Artist</div>
        <div className="main-text text-our-black">{artist}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Price</div>
        <div className="main-text text-our-black">${price}</div>
      </div>
    </Card>
  );
};

export default ServiceDetailsHeader;
