import React from "react";
import Card from "../card/Card";

/**
 * Component that displays service details, i.e. service, date, artist, price
 * @param details Object with properties corresponding to service details
 * // TODO: may need to refactor details prop data structure once the database schema is set up
 */
const ServiceDetailsHeader = ({ details = {} }) => {
  return (
    <Card className="grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-4 w-full">
      <div>
        <div className="main-text text-dark-grey">Service</div>
        <div className="main-text text-our-black">{details.service}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Date</div>
        <div className="main-text text-our-black">{details.date}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Artist</div>
        <div className="main-text text-our-black">{details.artist}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Price</div>
        <div className="main-text text-our-black">{details.price}</div>
      </div>
    </Card>
  );
};

export default ServiceDetailsHeader;
