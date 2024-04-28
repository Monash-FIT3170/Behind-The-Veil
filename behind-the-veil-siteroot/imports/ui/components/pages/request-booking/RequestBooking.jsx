/**
 * File Description: Request Booking page
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {ArrowLeftIcon} from '@heroicons/react/24/outline'

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
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      {/* TODO: implement back button functionality when implementing the actual work flow to get to this page */}
      <Button className="bg-transparent text-dark-grey flex gap-2">
        <ArrowLeftIcon className="size-6"/>
        Back
      </Button>
      <div className="flex flex-col gap-4 px-40">
        <div className="large-text">Request Booking</div>
        <ServiceDetailsHeader
          service={MOCK_SERVICE_DETAILS.service}
          date={MOCK_SERVICE_DETAILS.date}
          artist={MOCK_SERVICE_DETAILS.artist}
          price={MOCK_SERVICE_DETAILS.price}
        />
      </div>
    </WhiteBackground>

  );
};

export default RequestBooking;
