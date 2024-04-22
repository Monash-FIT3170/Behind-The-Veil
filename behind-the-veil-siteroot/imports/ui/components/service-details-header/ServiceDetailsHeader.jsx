import React from "react";
import Card from "../card/Card";

/**
 * Component that displays service details, i.e. service, date, artist, price
 * @param {string} service Name of service
 * @param {string} date Date of service performed
 * @param {string} artist Name of artist providing service
 * @param {string} price Price of service
 * // TODO: may need to refactor props once the database schema is set up
 */
const ServiceDetailsHeader = ({ service, date, artist, price }) => {
  return (
    <Card className="grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-4 w-full">
      <div>
        <div className="main-text text-dark-grey">Service</div>
        <div className="main-text text-our-black">{service}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Date</div>
        <div className="main-text text-our-black">{date}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Artist</div>
        <div className="main-text text-our-black">{artist}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Price</div>
        <div className="main-text text-our-black">{price}</div>
      </div>
    </Card>
  );
};

export default ServiceDetailsHeader;
