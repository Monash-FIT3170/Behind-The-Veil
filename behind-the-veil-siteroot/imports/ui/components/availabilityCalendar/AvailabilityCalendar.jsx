/**
 * File Description: Request Booking calendar component
 * File version: 1.1
 * Contributors: Josh, Laura
 */

import React from "react";
import Calendar from "react-calendar";
import "./AvailabilityCalendar.css";
import {addYears, startOfDay} from "date-fns";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

// min date = today, max date = 3 yrs from now
export const VALID_INTERVAL = { start: startOfDay(new Date()), end: startOfDay(addYears(new Date(), 3)) }

const AvailabilityCalendar = ({ ...props }) => {
  return (
    <Calendar
      minDate={VALID_INTERVAL.start} 
      maxDate={VALID_INTERVAL.end} 
      prevLabel={<ChevronLeftIcon className="size-4" />}
      prev2Label={null}
      nextLabel={<ChevronRightIcon className="size-4" />}
      next2Label={null}
      {...props}
    />
  );
};

export default AvailabilityCalendar;
