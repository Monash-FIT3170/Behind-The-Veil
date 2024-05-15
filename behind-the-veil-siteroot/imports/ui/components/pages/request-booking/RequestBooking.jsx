/**
 * File Description: Request Booking page
 * File version: 1.2
 * Contributors: Josh, Nikki
 */

import React, { useId, useState } from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import RequestBookingCalendar, { VALID_INTERVAL } from "./RequestBookingCalendar/RequestBookingCalendar.jsx";
import Input from "../../input/Input";
import PreviousButton from "../../button/PreviousButton";
import mockBookings from './mockBookings.json'
import { addHours, areIntervalsOverlapping, eachHourOfInterval, isEqual, set, format, isValid, isDate, parse, isWithinInterval, startOfDay, addYears, startOfHour, isAfter, eachDayOfInterval, nextDay, isSameDay, addDays } from "date-fns";
import { BookingStatus } from "../../../enums/BookingStatus.ts";
import { useNavigate } from "react-router-dom";

/**
 * Page for user to request a booking
 */
const RequestBooking = () => {
  const navigateTo = useNavigate();

  const MOCK_SERVICE_DETAILS = {
    service: "Bachelorette Glam Experience",
    artist: "Alice Tran",
    price: "$120",
  };

  /**
   * Calculate available times that the user can select, based on date, duration, and existing bookings
   * @param {Date} date day at which we want the available time slots
   * @param {number} duration integer corresponding to service duration in hours
   * @param {Array} bookings array of booking objects
   * @returns array of date objects that correspond to available times, on the hour
   */
  const getAvailableTimes = ({ date, duration, bookings }) => {
    if (!(isValid(date) && isDate(date))) {
      console.warn('invalid date')
      return []
    }
    if (!Array.isArray(bookings)) {
      console.warn('bookings is not an array')
      return []
    }

    const hours = eachHourOfInterval({
      // TODO: for now, assume that artists can work 6am to 7pm every day
      start: set(date, { hours: 6, minutes: 0, seconds: 0 }),
      end: set(date, { hours: (19 - duration), minutes: 0, seconds: 0 })
    })

    const confirmedBookings = bookings.filter((booking) => {
      return booking.bookingStatus === BookingStatus.CONFIRMED
    })

    // for each hour, check if that hour is 'free'
    // an hour is 'available' if the start of the hour + service duration doesn't overlap with any existing confirmed booking
    const availableTimes = hours.filter((hour) => {
      if (!isAfter(startOfHour(hour), new Date())) return false

      // check every booking and see if they overlap with this hour + service duration
      // if there are no overlapping bookings, then this hour is available
      return !confirmedBookings.some((booking) => {
        const confirmedBookingStart = booking.bookingStartDateTime
        const confirmedBookingEnd = addHours(confirmedBookingStart, booking.bookingDuration)

        return areIntervalsOverlapping(
          { start: hour, end: addHours(hour, duration) }, // time slot interval
          { start: confirmedBookingStart, end: confirmedBookingEnd } // confirmed booking interval
        )
      })
    })

    return availableTimes
  };

  // TODO: this function might not be needed once we use real bookings b/c I think start time is stored as date object
  // converting json datetimes to js datetimes
  const parseBookings = (bookings) => {
    return bookings.map((booking) => {
      return {
        ...booking,
        bookingStartDateTime: new Date(booking.bookingStartDateTime)
      }
    })
  }

  // TODO: make actual database call to get all bookings for this artist id
  const bookings = parseBookings(mockBookings)

  // TODO: get actual duration from this service
  const duration = 2

  // initialise date input to the first day with availabilities
  const initDateInput = () => {
    // starting with today, iterate until we find a day with available times
    let day = startOfDay(new Date())
    while (getAvailableTimes({ date: day, duration: duration, bookings: bookings }).length === 0) {
      day = startOfDay(addDays(day, 1))
      if (isAfter(day, VALID_INTERVAL.end)) return '' // beyond valid interval
    }

    return day
  }

  // form input values
  const [inputs, setInputs] = useState({
    location: "",
    date: initDateInput(),
    time: "",
  });

  // id's
  const locationInputId = useId();
  const dateInputId = useId();
  const timeInputId = useId();

  // form related functions
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((i) => ({ ...i, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: implement validation, i.e. must have a valid time

    // pass the data to the next page via the url
    const query = new URLSearchParams(inputs).toString();
    navigateTo(`/booking-summary?${query}`);
  }

  const handleManualDateInput = (event) => {
    const dateInput = event.target.value;

    // if manual input is a valid date within the allowable interval
    // convert it to a date object and store it
    const dateFormat = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/
    if (dateFormat.test(dateInput)) {
      const parsedDate = parse(dateInput, 'dd-MM-yyyy', new Date())
      if (
        isValid(parsedDate) &&
        isWithinInterval(parsedDate, VALID_INTERVAL)
      ) {
        setInputs((i) => ({ ...i, date: parsedDate }));
        return
      }
    }

    // else, just update date input with the raw value
    setInputs((i) => ({ ...i, date: dateInput }));
    return
  }

  // for representing date object as DD-MM-YYYY in the date input
  const formatDateInput = (dateInput) => {
    // if the input is a valid date and a date object, format it 
    if (isValid(dateInput) && isDate(dateInput)) return format(dateInput, 'dd-MM-yyyy')

    return dateInput
  }

  const availableTimes = getAvailableTimes({ date: inputs.date, duration: duration, bookings: bookings });

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      {/* TODO: implement back button functionality when implementing the actual work flow to get to this page */}
      <PreviousButton />

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
            <div className="flex flex-col md:flex-row gap-4 md:gap-10">
              {/* date input + calendar */}
              <div className="flex flex-col flex-grow gap-1 md:max-w-[350px] lg:max-w-[420px] xl:lg:max-w-[490px]">
                <label htmlFor={dateInputId} className="main-text text-our-black">Select Date</label>
                <div className="flex flex-col gap-4">
                  <Input
                    id={dateInputId}
                    placeholder="DD-MM-YYYY"
                    name="date"
                    value={formatDateInput(inputs.date) || ""}
                    onChange={handleManualDateInput}
                  />
                  {/* calendar component */}
                  <RequestBookingCalendar
                    value={isValid(inputs.date) && isDate(inputs.date) ? inputs.date : null}
                    onChange={(date) => {
                      setInputs((i) => {
                        return {
                          ...i,
                          date: date,
                        };
                      });
                    }}
                    tileClassName={({ date, view }) => {
                      const availableTimes = getAvailableTimes({ date: new Date(date), duration: duration, bookings: bookings })
                      if (
                        view === 'month' &&
                        availableTimes.length > 0
                      ) {
                        return 'available'
                      }
                    }}
                  />
                </div>
              </div>

              {/* available time buttons */}
              {/* <div className="flex sm:flex-grow sm:justify-center"> */}
              <div className="flex flex-col flex-grow gap-1">
                <label
                  htmlFor={timeInputId}
                  className="main-text text-our-black"
                >
                  Select Start Time (Duration: {duration}hr)
                </label>
                <div id={timeInputId} className="grid grid-cols-2 gap-2">

                  {/* if there are available times, render the time input buttons */}
                  {!Array.isArray(availableTimes) || availableTimes.length === 0 ?
                    "No available times" :
                    availableTimes.map((time) => {
                      const baseStyle = "w-full";
                      const activeStyle = "bg-dark-grey text-white";
                      const className =
                        isEqual(inputs.time, time)
                          ? `${baseStyle} ${activeStyle}`
                          : baseStyle;

                      return (
                        <Button
                          key={time}
                          className={className}
                          onClick={() => {
                            setInputs((i) => {
                              return {
                                ...i,
                                time: time,
                              };
                            });
                          }}
                        >
                          {format(time, 'p')}
                        </Button>
                      );
                    })}
                </div>
              </div>
              {/* </div> */}

            </div>

            <Button
              className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 w-fit justify-center"
              type="submit"
            >
              Next Step
              <ArrowRightIcon className="icon-base" />
            </Button>
          </div>
        </form>
      </div>
    </WhiteBackground>
  );
};

export default RequestBooking;
