/**
 * File Description: Cancel Booking page
 * File version: 1.0
 * Contributors: Anusha Yadav
 */

import React from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
//import Card from "../card/Card";
import Button from "../../button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import {CheckIcon} from "@heroicons/react/24/outline"

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
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      <Button className="bg-transparent text-dark-grey flex gap-2">
        <ArrowLeftIcon className="size-6" />
        Back
      </Button>

      {/* Main container for content */}
      <div className="flex flex-col gap-4 xl:px-40">
        <div className="large-text">Cancel Booking</div>
        <ServiceDetailsHeader
          service={MOCK_CANCEL_BOOKING_DETAILS.service}
          date={MOCK_CANCEL_BOOKING_DETAILS.date}
          artist={MOCK_CANCEL_BOOKING_DETAILS.artist}
          price={MOCK_CANCEL_BOOKING_DETAILS.price}
        />

        {/* cancellation reason */}
        <div className="flex flex-col gap-1">
          <label for="cancellation-input" className="main-text text-our-black">Reason of cancellation</label>
            <textarea id="cancellation-input" className="border-light-grey border-2 p-2 rounded main-text" placeholder="Enter Your Reason" rows={4} cols={40} />
        </div>

        {/* button */}
        <div className="flex gap-10">
          {/* button */}
          <div className="flex flex-col gap-4 grow">
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2">
                <CheckIcon className="h-6 w-6 min-h-6 min-w-6"/>
                Confirm Cancellation
            </Button>

          </div>
        </div>

      </div>

    </WhiteBackground>
  );
};
export default CancelBooking;
