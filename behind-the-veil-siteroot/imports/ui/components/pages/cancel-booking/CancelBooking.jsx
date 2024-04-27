/**
 * File Description: Cancel Booking page
 * File version: 1.0
 * Contributors: Anusha Yadav
 */

import React from "react";
import Card from "../card/Card";
import ServiceDetailsHeader from "../service-details-header/ServiceDetailsHeader";
import Button from "../button/Button";

/**
 * Page for user to cancel a booking
 */

const CancelBooking = () => {
  const MOCK_CANCEL_BOOKING_DETAILS = {
    service: "Bachelorette Glam Experience",
    date: "Tuesday, 12 May, 2024",
    artist: "Jane Doe",
    price: "$120"
  }

  return (
    <div className="flex flex-col gap-4 px-40 py-10">
      <div className="large-text">Cancel Booking</div>
      <ServiceDetailsHeader
        service={MOCK_CANCEL_BOOKING_DETAILS.service}
        date={MOCK_CANCEL_BOOKING_DETAILS.date}
        artist={MOCK_CANCEL_BOOKING_DETAILS.artist}
        price={MOCK_CANCEL_BOOKING_DETAILS.price}
      />

      {/* user response form */}
      <div className="flex flex-col gap-4">

        {/* cancellation reason */}
        <div className="flex flex-col gap-1">
          <label for="cancellation-input" className="main-text text-our-black">Reason of cancellation</label>
          <input id="cancellation-input" className="border-light-grey border-2 p-2 rounded main-text" placeholder="Enter Your Reason"></input>
        </div>

        {/* button */}
        <div className="flex gap-10">
          {/* button */}
          <div className="flex flex-col gap-4 grow">
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover">Cancel Booking</Button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CancelBooking;
