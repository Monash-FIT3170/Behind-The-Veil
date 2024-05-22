/**
 * File Description: Request Booking page
 * File version: 1.2
 * Contributors: Josh, Nikki
 */

import React, {useId, useState, useEffect} from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import RequestBookingCalendar, {VALID_INTERVAL} from "./RequestBookingCalendar/RequestBookingCalendar.jsx";
import Input from "../../input/Input";
import PreviousButton from "../../button/PreviousButton";
import mockBookings from './mockBookings.json'
import {
    addDays,
    addHours,
    areIntervalsOverlapping,
    eachHourOfInterval,
    format,
    isAfter,
    isDate,
    isEqual,
    isValid,
    isWithinInterval,
    parse,
    set,
    startOfDay,
    startOfHour
} from "date-fns";
import BookingStatus from "../../../enums/BookingStatus.ts";
import {useNavigate} from "react-router-dom";
import { AddressAutofill } from "@mapbox/search-js-react";

/**
 * Page for user to request a booking
 */

const RequestBooking = () => {
    const navigateTo = useNavigate();

    const MOCK_SERVICE_DETAILS = {
        service: "Bachelorette Glam Experience",
        artist: "Alice Tran",
        price: "$120",
        type: "Bridal makeup"
    };

    /**
     * Calculate available times that the user can select, based on date, duration, and existing bookings
     * @param {Date} date day at which we want the available time slots
     * @param {number} duration integer corresponding to service duration in hours
     * @param {Array} bookings array of booking objects
     * @returns array of date objects that correspond to available times, on the hour
     */
    const getAvailableTimes = ({date, duration, bookings}) => {
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
            start: set(date, {hours: 6, minutes: 0, seconds: 0}),
            end: set(date, {hours: (19 - duration), minutes: 0, seconds: 0})
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
                    {start: hour, end: addHours(hour, duration)}, // time slot interval
                    {start: confirmedBookingStart, end: confirmedBookingEnd} // confirmed booking interval
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
    };

    // TODO: make actual database call to get all bookings for this artist id
    const bookings = parseBookings(mockBookings)

    // TODO: get actual duration from this service
    const duration = 2

    // initialise date input to the first day with availabilities
    const initDateInput = () => {
        // starting with today, iterate until we find a day with available times
        let day = startOfDay(new Date())
        while (getAvailableTimes({date: day, duration: duration, bookings: bookings}).length === 0) {
            day = startOfDay(addDays(day, 1))
            if (isAfter(day, VALID_INTERVAL.end)) return '' // beyond valid interval
        }

        return day
    };
    
    

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
    // Different parts of address
    const [address, setAddress] = useState({
        street:"",
        suburb:"",
        state:"",
        post:"",
    });

    // Retrieve parts of the address
    const handleStreet = (event) => {
      const value = event.target.value;
      setAddress((i) => ({...i, street: value}));
    };
    const handleSuburb = (event) => {
      const value = event.target.value;
      setAddress((i) => ({...i, suburb: value}));
    };
    const handleState = (event) => {
      const value = event.target.value;
      setAddress((i) => ({...i, state: value}));
    };
    const handlePost = (event) => {
      const value = event.target.value;
      setAddress((i) => ({...i, post: value}));
    };

    // Join address parts for full address
    useEffect(() => {
      const street =address.street
      const suburb = address.suburb
      const state = address.state
      const post = address.post
      const full = street + ', ' + suburb + ' ' + post + ', ' + state;
      setInputs((i) => ({...i, location: full}));
    }, [address]); //



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!(isValid(inputs.time))) {
            alert('Please select a valid time.')
            return
        } else if (!inputs.location) {
            alert('Please select a valid location.')
            return;
        }

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
                setInputs((i) => ({...i, date: parsedDate}));
                return
            }
        }

        // else, just update date input with the raw value
        setInputs((i) => ({...i, date: dateInput}));
        return
    }

    // for representing date object as DD-MM-YYYY in the date input
    const formatDateInput = (dateInput) => {
        // if the input is a valid date and a date object, format it
        if (isValid(dateInput) && isDate(dateInput)) return format(dateInput, 'dd-MM-yyyy')

        return dateInput
    }

    const availableTimes = getAvailableTimes({date: inputs.date, duration: duration, bookings: bookings});

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            {/* TODO: implement back button functionality when implementing the actual work flow to get to this page */}
            <PreviousButton/>

            {/* Main container for content */}
            <div className="flex flex-col gap-4 xl:px-40">
                <div className="large-text">Request Booking</div>
                <ServiceDetailsHeader
                    service={MOCK_SERVICE_DETAILS.service}
                    type={MOCK_SERVICE_DETAILS.type}
                    artist={MOCK_SERVICE_DETAILS.artist}
                    price={MOCK_SERVICE_DETAILS.price}
                />

                {/* input form */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        {/* location */}
                        <AddressAutofill
                        accessToken="pk.eyJ1IjoibWFzdGVyY2hpZWYwIiwiYSI6ImNsdzdtMXAyZzBtdWgyc280Z2wycHlzZXEifQ.X3CmBWszdI4h1y0vri5KsA"
                        >
                        <Input
                            id={locationInputId}
                            label={<label htmlFor={locationInputId}
                            className="main-text text-our-black">Location</label>}
                            className = "location"
                            placeholder="Input location for service: wedding venue, address, ..."
                            name="location"
                            autoComplete = "street-address"
                            value= {address.street}
                            onChange= {handleStreet}
                        />
                        <Input
                          className = "location"
                          value = {address.suburb}
                          onChange = {handleSuburb}
                          autoComplete = "address-level2"
                          style={{opacity: 0, height: 1, width:1}}
                          />
                        <Input
                          className = "location"
                          value = {address.state}
                          onChange = {handleState}
                          autoComplete = "address-level1"
                          style={{opacity: 0, height: 1, width:1}}
                        />
                        <Input
                          className = "location"
                          value = {address.post}
                          onChange = {handlePost}
                          autoComplete = "postal-code"
                          style={{opacity: 0, height: 1, width:1}}
                        />
                        </AddressAutofill>

                        {/* date/time */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                            {/* date input + calendar */}
                            <div
                                className="flex flex-col flex-grow gap-1 md:max-w-[350px] lg:max-w-[420px] xl:lg:max-w-[490px]">
                                <div className="flex flex-col gap-4">
                                    <Input
                                        id={dateInputId}
                                        label={<label htmlFor={dateInputId} className="main-text text-our-black">Select
                                            Date</label>}
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
                                        tileClassName={({date, view}) => {
                                            const availableTimes = getAvailableTimes({
                                                date: new Date(date),
                                                duration: duration,
                                                bookings: bookings
                                            })
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
                                        <span className={"main-text text-dark-grey text-center col-span-2 mt-4"}>No available times</span> :
                                        availableTimes.map((time) => {
                                            const baseStyle = "w-full";
                                            const activeStyle = "bg-dark-grey text-white hover:bg-dark-grey";
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
                            <ArrowRightIcon className="icon-base"/>
                        </Button>
                    </div>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default RequestBooking;
