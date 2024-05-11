/**
 * File Description: Request Booking page
 * File version: 1.1
 * Contributors: Josh, Nikki
 */

import React, { useId, useState } from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Input from "../../input/Input";
import PreviousButton from "../../button/PreviousButton";

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

  // form input values
  const [inputs, setInputs] = useState({
    location: "",
    date: "",
    time: ""
  })

  // id's
  const locationInputId = useId()
  const dateInputId = useId()
  const timeInputId = useId()

  // form related functions
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(i => ({ ...i, [name]: value }))
  }

  // TODO: send this data to the next page
  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: implement validation, i.e. must have a valid time
    alert(`Form submitted with the following inputs: ${JSON.stringify(inputs)}`)
  }

  // calculate available times that the user can select, based on a date
  // TODO: implement this properly instead of returning dummy data
  const getAvailableTimes = (date) => {
    const AVAILABLE_TIMES = ["10:00am", "11:00am", "12:00pm", "2:00pm", "4:00pm"]
    return date !== "" ? AVAILABLE_TIMES : null
  }

  const availableTimes = getAvailableTimes(inputs.date)

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      {/* TODO: implement back button functionality when implementing the actual work flow to get to this page */}
      <PreviousButton/>

      {/* Main container for content */}
      <div className="flex flex-col gap-4 xl:px-40">
        <div className="large-text">Request Booking</div>
        <ServiceDetailsHeader
          service={MOCK_SERVICE_DETAILS.service}
          date={MOCK_SERVICE_DETAILS.date}
          artist={MOCK_SERVICE_DETAILS.artist}
          price={MOCK_SERVICE_DETAILS.price}
        />

        {/* input form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">

            {/* location */}
            <div className="flex flex-col gap-1">
              <label htmlFor={locationInputId} className="main-text text-our-black">Location</label>
              <Input
                id={locationInputId}
                placeholder="Input location for service: wedding venue, address, ..."
                name="location"
                value={inputs.location || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* date/time */}
            <div className="flex gap-10">
              {/* input fields */}
              <div className="flex flex-col gap-4 grow">
                <div className="flex flex-col gap-1">
                  <label htmlFor={dateInputId} className="main-text text-our-black">Select Date</label>
                  <Input
                    id={dateInputId}
                    placeholder="Select a date"
                    name="date"
                    value={inputs.date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* if there are available times, render the time input buttons */}
                {
                  availableTimes && (
                    <div className="flex flex-col gap-1">
                      <label htmlFor={timeInputId} className="main-text text-our-black">Select Start Time</label>
                      <div id={timeInputId} className="grid grid-cols-2 gap-2">
                        {
                          availableTimes.map((time) => {
                            const baseStyle = "w-full"
                            const activeStyle = "bg-dark-grey text-white"
                            const className = inputs.time === time ?
                              `${baseStyle} ${activeStyle}` :
                              baseStyle

                            return (
                              <Button
                                key={time}
                                className={className}
                                onClick={() => {
                                  setInputs((i) => {
                                    return {
                                      ...i,
                                      time: time
                                    }
                                  })
                                }}
                              >
                                {time}
                              </Button>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                }

                <Button
                  className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                  type="submit"
                >
                  Next Step
                  <ArrowRightIcon className="size-6 stroke-2"/>
                </Button>
              </div>

              {/* calendar component */}
              <div className="flex grow bg-light-grey justify-center items-center text-center">
                CALENDAR PLACEHOLDER
              </div>
            </div>
          </div>
        </form >
      </div >
    </WhiteBackground>
  );
};

export default RequestBooking;
