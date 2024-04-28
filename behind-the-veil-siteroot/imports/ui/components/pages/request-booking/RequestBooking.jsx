/**
 * File Description: Request Booking page
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useId, useState } from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

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

  const AVAILABLE_TIME_SLOTS = []

  // id's
  const locationInputId = useId()
  const dateInputId = useId()
  const timeInputId = useId()

  const [inputs, setInputs] = useState({
    location: "",
    date: "",
    time: ""
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(i => ({...i, [name]: value}))
  }

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      {/* TODO: implement back button functionality when implementing the actual work flow to get to this page */}
      <Button className="bg-transparent text-dark-grey flex gap-2">
        <ArrowLeftIcon className="size-6" />
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

        {/* input form */}
        <form
          // TODO: set "action = /[next page]"
          // TODO: set "method = "POST""
        >
          <div className="flex flex-col gap-4">

            {/* location */}
            <div className="flex flex-col gap-1">
              <label htmlFor={locationInputId}className="main-text text-our-black">Location</label>
              <input
                id={locationInputId}
                className="border-light-grey border-2 p-2 rounded main-text"
                placeholder="Input location for service: wedding venue, address, ..."
                name="booking-location"
                value={inputs.location || ""}
              />
            </div>

            {/* date/time */}
            <div className="flex gap-10">
              {/* input fields */}
              <div className="flex flex-col gap-4 grow">
                <div className="flex flex-col gap-1">
                  <label htmlFor={dateInputId} className="main-text text-our-black">Select Date</label>
                  <input
                    id={dateInputId} 
                    className="border-light-grey border-2 p-2 rounded main-text"
                    placeholder="Select a date"
                    name="booking-date"
                    value={inputs.date || ""}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor={timeInputId} className="main-text text-our-black">Select Start Time</label>
                  {/* <input id="" className="border-light-grey border-2 p-2 rounded main-text" placeholder="Select a time" /> */}
                </div>
                <Button
                  className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                  type="submit"
                >
                  Next Step
                  <ArrowRightIcon className="size-6" />
                </Button>
              </div>

              {/* calendar component */}
              <div className="flex grow bg-light-grey">
                CALENDAR PLACEHOLDER
              </div>
            </div>
          </div>
        </form>
      </div>
    </WhiteBackground>

  );
};

export default RequestBooking;
