/**
 * File Description: Review the booking details page 
 * File version: 1.0
 * Contributors: Glenn 
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  XCircleIcon,
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import FormOutput from "./FormOutput";
import Tooltip from "./StatusToolTip";
import MarkerMap from "../../map/MarkerMap";
// Array of days for date formatting
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Component for displaying booking summary and allowing continuation to the next step.
 */

const BookingDetails = () => {
  const BookingStatus = "Pending";
  const AcceptButton = (
    <div>
      <Button className="bg-indigo-400 flex gap-2 ml-14 py-1 items-center justify-center w-32">
        <CheckCircleIcon className="size-4 p-0" />
        Accept
      </Button>
    </div>
  );
  /* Functions to simplify what buttons to display depending on the booking status */
  const RejectButton = (
    <div>
      <Button className=" flex gap-2 ml-14 py-1 items-center justify-center w-32">
        <XCircleIcon className="size-4 p-0" />
        Reject
      </Button>
    </div>
  );

  const CancelBookingButton = (
    <div>
      <Button className=" flex gap-2 ml-14 py-1 items-center justify-center w-48">
        <NoSymbolIcon className="size-4 p-0" />
        Cancel Booking
      </Button>
    </div>
  );
  const DisplayBookingButtons = {
    Confirmed: (
      <div className="flex justify-center mt-5">{CancelBookingButton}</div>
    ),
    Pending: (
      <>
        <div className="flex justify-center mt-5 ">{AcceptButton}</div>
        <div className="flex justify-center mt-2">{RejectButton}</div>
      </>
    ),
  };
  /** Tip text content */
  const tipText = (
    <div>
      <p className="font-bold">Active Statuses:</p>
      <li className="ml-5">
        <span className="text-emerald-700">Confirmed</span>
        <span>: A booking scheduled to proceed</span>
      </li>
      <li className="ml-5">
        <span className="text-sky-700">Awaiting Confirmation</span>
        <span>: Waiting on artist to confirm the booking details</span>
      </li>
      <p className="font-bold">Closed Statuses:</p>
      <li className="ml-5">
        <span className="text-emerald-700">Completed</span>
        <span>: A booking that was completed successfully</span>
      </li>
      <li className="ml-5">
        <span className="text-rose-700">Cancelled</span>
        <span>: A booking cancelled by the artist or bride</span>
      </li>
      <li className="ml-5">
        <span className="text-rose-700">Rejected</span>
        <span>: A booking rejected by the artist</span>
      </li>
    </div>
  );

  /**
   * Function to calculate start and end dates based on input date, time, and service duration.
   * @param {string} dateString - Date string in format 'YYYY-MM-DD'.
   * @param {string} timeString - Time string in format 'HH:MM'.
   * @param {number} serviceDuration - Duration of service in hours.
   * @returns {Array<Date>} - Array containing start date, end date, and formatted date range string.
   */
  const getStartAndEndDate = (dateString, timeString, serviceDuration) => {
    // Create start date from input date and time
    let dateTimeStr = dateString + " " + timeString;
    let startDate = new Date(dateTimeStr);
    // Calculate end date by adding service duration to start date
    let endDate = new Date(
      startDate.getTime() + serviceDuration * 60 * 60 * 1000
    );

    // Options for date formatting
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    // Get day of the week from start date
    const day = days[startDate.getDay()];
    // Format start and end dates
    const startFormatted = startDate.toLocaleString("en-AU", options);
    const endFormatted = endDate.toLocaleString("en-AU", options);

    return [
      startDate,
      endDate,
      `${day} ${dateString} ${startFormatted} - ${endFormatted}`,
    ];
  };

  /**
   * Function to retrieve query data from URL parameters.
   * @returns {Object} - Object containing booking details.
   */
  const queryData = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Extract location, date, and time from URL parameters
    const location = urlParams.get("location");
    const date = urlParams.get("date");
    const time = urlParams.get("time");

    // TODO: bride and artist details should be queried from database
    return {
      Ref: "120412301",
      "Bride Name": "Jane Doe",
      "Artist Name": "Alice Tran",
      Service: "Bachelorette Glam Experience",
      Location: "Sothern Cross, Mel",
      Date: "Thu 21/03/23 10:00AM - 12:00PM", // Hardcoded to be 2-hour duration, can be dynamic
      Price: "$120.00",
    };
  };

  /**
   * Function to handle form submission.
   * Passes the form data to the next page via the URL.
   */
  const handleSubmit = () => {
    // pass the data to the next page via the url
    const query = new URLSearchParams(queryData()).toString();
    console.log(query);
    // TODO: Navigate to payment page
  };

  // Navigate hook for redirecting to another page
  const navigateTo = useNavigate();
  const dummyData = queryData();
  return (
    <WhiteBackground>
      {/* Back button */}
      <Button
        className="bg-transparent text-dark-grey flex gap-2"
        onClick={() => navigateTo("/request-booking")}
      >
        <ArrowLeftIcon className="size-6" />
        Back
      </Button>
      <div className="flex flex-row">
        {/* Booking summary */}
        <div className="flex basis-2/3 flex-col gap-4 xl:px-20">
          <div className="large-text">Booking Details</div>
          {/* Display booking details */}
          <div className="flex flex-col gap-5 xl:px-10">
            <FormOutput
              textColor="text-dark-grey"
              label="Ref"
              input={dummyData.Ref}
            />
            <div className="flex flex-row">
              <FormOutput
                textColor="text-dark-grey"
                label="Bride Name"
                input={dummyData["Bride Name"]}
              />
              <Button
                className="text-dark-grey flex gap-2 ml-14 py-1"
                onClick={() => navigateTo("/request-booking")}
              >
                <ChatBubbleOvalLeftIcon className="size-5" />
                <p className="text-sm">Message</p>
              </Button>
            </div>

            <FormOutput
              textColor="text-dark-grey"
              label="Artist Name"
              input={dummyData["Artist Name"]}
            />

            <FormOutput
              textColor="text-dark-grey"
              label="Service"
              input={dummyData.Service}
            />
            <FormOutput
              textColor="text-dark-grey"
              label="Location"
              input={dummyData.Location}
            />
            <FormOutput
              textColor="text-dark-grey"
              label="Date"
              input={dummyData.Date}
            />
            <FormOutput
              textColor="text-dark-grey"
              label="Price"
              input={dummyData["Price"]}
            />

            <div className="gap-1">
              <span className="m-0">Description</span>
              <br></br>
              <span className="font-bold">
                In a quaint village, a mischievous cat stumbled upon a forgotten
                treasure map. With newfound excitement, it embarked on a daring
                adventure, uncovering secrets and surprises along the way.
              </span>
            </div>
          </div>
        </div>

        <div className="Rightside flex flex-col basis-1/3 ">
          <div className="flex justify-end">
            <Tooltip
              className="status-tooltip"
              status={BookingStatus}
              tipText={tipText}
            />
          </div>
          <div className="flex flex-col mt-10">
            <MarkerMap
              className={""}
              location={"Southern Cross,Melbourne,Australia"}
            />
          </div>
          {DisplayBookingButtons[BookingStatus]}
        </div>
      </div>
    </WhiteBackground>
  );
};

export default BookingDetails;
