import React from "react";
import Calendar from "react-calendar";
import "./RequestBookingCalendar.css";
import { addYears } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const RequestBookingCalendar = ({ ...props }) => {
  return (
    <Calendar
      minDate={new Date()} // min date = today
      maxDate={addYears(new Date(), 3)} // max date = 3 yrs from now
      prevLabel={<ChevronLeftIcon className="size-4" />}
      prev2Label={null}
      nextLabel={<ChevronRightIcon className="size-4" />}
      next2Label={null}
      {...props}
    />
  );
};

export default RequestBookingCalendar;
