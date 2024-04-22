/**
 * File Description: Request Booking page
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";

/**
 * Page for user to request a booking
 */
const RequestBooking = () => {
  const MOCK_SERVICE_DETAILS = {
    service: "Bachelorette Glam Experience",
    date: "Tuesday, 12 May, 2024",
    artist: "Alice Tran",
    price: "$120"
  }

  return (
    <div className="flex flex-col gap-4 px-40 py-10">
      <div className="large-text">Request Booking</div>
      <ServiceDetailsHeader 
        service={MOCK_SERVICE_DETAILS.service}
        date={MOCK_SERVICE_DETAILS.date}
        artist={MOCK_SERVICE_DETAILS.artist}
        price={MOCK_SERVICE_DETAILS.price}
      />
    </div>
  );
};

export default RequestBooking;
