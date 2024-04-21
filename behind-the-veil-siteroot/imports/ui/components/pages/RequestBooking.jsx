import React from "react";
import Card from "../card/Card";
import ServiceDetailsHeader from "../service-details-header/ServiceDetailsHeader";

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
      <ServiceDetailsHeader details={MOCK_SERVICE_DETAILS}/>
    </div>
  );
};

export default RequestBooking;
