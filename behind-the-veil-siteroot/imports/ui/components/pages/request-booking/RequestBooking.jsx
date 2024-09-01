/**
 * File Description: Request Booking page
 * File version: 1.2
 * Contributors: Josh, Nikki
 */

import React, { useEffect, useId, useState } from "react";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AvailabilityCalendar, { VALID_INTERVAL } from "../../../components/availabilityCalendar/AvailabilityCalendar.jsx";
import Input from "../../input/Input";
import PreviousButton from "../../button/PreviousButton";
import mockBookings from "./mockBookings.json";
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
    startOfHour,
} from "date-fns";
import BookingStatus from "../../../enums/BookingStatus.ts";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useSpecificService } from "../../DatabaseHelper";
import Loader from "../../loader/Loader";
import UrlBasePath from "../../../enums/UrlBasePath";
import { useUserInfo } from "../../util";
import { Modal } from "react-responsive-modal";
import { updateBookingStatus } from "../../DatabaseHelper";
import "react-responsive-modal/styles.css";

/**
 * Page for user to request a booking
 */

const RequestBooking = () => {
    const userInfo = useUserInfo();
    const location = useLocation();
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const bookingData = location.state?.bookingData;
    const isChangeRequest = !!bookingData;
    const [serviceDetails, setServiceDetails] = useState(null);
    // get service data from database
    const { isLoading, serviceData, artistData } = useSpecificService(serviceId);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (isChangeRequest) {
            // Use booking data for change requests
            setServiceDetails({
                serviceName: bookingData.serviceName,
                serviceType: bookingData.serviceType,
                artistName: bookingData.artistName,
                servicePrice: bookingData.bookingPrice,
            });
        } else if (serviceId) {
            // Fetch service data for new bookings
            if (!isLoading && serviceData) {
                setServiceDetails({
                    serviceName: serviceData.serviceName,
                    serviceType: serviceData.serviceType,
                    artistName: artistData.profile.alias,
                    servicePrice: serviceData.servicePrice,
                });
            }
        }
    }, [isChangeRequest, bookingData, isLoading, serviceData, artistData]);
    /**
     * Calculate available times that the user can select, based on date, duration, and existing bookings
     * @param {Date} date day at which we want the available time slots
     * @param {number} duration integer corresponding to service duration in hours
     * @param {Array} bookings array of booking objects
     * @returns array of date objects that correspond to available times, on the hour
     */
    const getAvailableTimes = ({ date, duration, bookings }) => {
        if (!(isValid(date) && isDate(date))) {
            console.warn("invalid date");
            return [];
        }
        if (!Array.isArray(bookings)) {
            console.warn("bookings is not an array");
            return [];
        }

        const hours = eachHourOfInterval({
            // TODO: for now, assume that artists can work 6am to 7pm every day
            start: set(date, { hours: 6, minutes: 0, seconds: 0 }),
            end: set(date, { hours: 19 - duration, minutes: 0, seconds: 0 }),
        });

        const confirmedBookings = bookings.filter((booking) => {
            return booking.bookingStatus === BookingStatus.CONFIRMED;
        });

        // for each hour, check if that hour is 'free'
        // an hour is 'available' if the start of the hour + service duration doesn't overlap with any existing confirmed booking
        const availableTimes = hours.filter((hour) => {
            if (!isAfter(startOfHour(hour), new Date())) return false;

            // check every booking and see if they overlap with this hour + service duration
            // if there are no overlapping bookings, then this hour is available
            return !confirmedBookings.some((booking) => {
                const confirmedBookingStart = booking.bookingStartDateTime;
                const confirmedBookingEnd = booking.bookingEndDateTime;

                return areIntervalsOverlapping(
                    { start: hour, end: addHours(hour, duration) }, // time slot interval
                    { start: confirmedBookingStart, end: confirmedBookingEnd } // confirmed booking interval
                );
            });
        });

        return availableTimes;
    };

    // TODO: this function might not be needed once we use real bookings b/c I think start time is stored as date object
    // converting json datetimes to js datetimes
    const parseBookings = (bookings) => {
        return bookings.map((booking) => {
            return {
                ...booking,
                bookingStartDateTime: new Date(booking.bookingStartDateTime),
            };
        });
    };

    // TODO: make actual database call to get all bookings for this artist id
    const bookings = parseBookings(mockBookings);

    // TODO: get actual duration from this service
    const duration = 2;

    // initialise date input to the first day with availabilities
    const initDateInput = () => {
        // starting with today, iterate until we find a day with available times
        let day = startOfDay(new Date());
        while (getAvailableTimes({ date: day, duration: duration, bookings: bookings }).length === 0) {
            day = startOfDay(addDays(day, 1));
            if (isAfter(day, VALID_INTERVAL.end)) return ""; // beyond valid interval
        }

        return day;
    };

    // form input values
    const [inputs, setInputs] = useState({
        location: bookingData?.location || "",
        date: bookingData?.bookingStartDateTime ? new Date(bookingData.bookingStartDateTime) : initDateInput(),
        time: bookingData?.bookingStartDateTime ? new Date(bookingData.bookingStartDateTime) : "",
    });

    // id's
    const locationInputId = useId();
    const dateInputId = useId();
    const timeInputId = useId();

    // form related functions
    // Different parts of address
    const [address, setAddress] = useState(() => {
        if (bookingData?.location) {
            const [street, suburbPostState] = bookingData.location.split(", ");
            const [suburbPost, state] = suburbPostState.split(", ");
            const [suburb, post] = suburbPost.split(" ");
            return { street, suburb, state, post };
        }
        return { street: "", suburb: "", state: "", post: "" };
    });
    const [locationError, setLocationError] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const isLocationValid = (location) => {
        // Implement your logic here to check if the location is within range
        // This is a placeholder implementation
        return location.length > 0 && !/^(\s*,\s*)*$/.test(location);
    };

    // Retrieve parts of the address
    const handleStreet = (event) => {
        const value = event.target.value;
        setAddress((i) => ({ ...i, street: value }));
    };
    const handleSuburb = (event) => {
        const value = event.target.value;
        setAddress((i) => ({ ...i, suburb: value }));
    };
    const handleState = (event) => {
        const value = event.target.value;
        setAddress((i) => ({ ...i, state: value }));
    };
    const handlePost = (event) => {
        const value = event.target.value;
        setAddress((i) => ({ ...i, post: value }));
    };

    // Join address parts for full address
    useEffect(() => {
        const street = address.street;
        const suburb = address.suburb;
        const state = address.state;
        const post = address.post;
        const full = street + ", " + suburb + " " + post + ", " + state;
        setInputs((i) => ({ ...i, location: full }));
    }, [address]); //

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isLocationValid(inputs.location)) {
            setLocationError("This location is invalid. Please check location. It is outside the artist's available range or empty.");
            return;
        }
        if (!isValid(inputs.time)) {
            alert("Please select a valid time.");
            return;
        }
        setLocationError("");

        if (isChangeRequest) {
            setShowConfirmModal(true);
        } else {
            // For new bookings, navigate to the next step (booking summary)
            const query = new URLSearchParams({
                ...inputs,
                artistUsername: serviceDetails.artistUsername,
                artistName: serviceDetails.artistName,
                price: serviceDetails.servicePrice,
                serviceName: serviceDetails.serviceName,
            }).toString();
            navigate(`/${UrlBasePath.SERVICES}/${serviceId}/booking-summary?${query}`);
        }
    };

    const handleManualDateInput = (event) => {
        const dateInput = event.target.value;

        // if manual input is a valid date within the allowable interval
        // convert it to a date object and store it
        const dateFormat = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
        if (dateFormat.test(dateInput)) {
            const parsedDate = parse(dateInput, "dd-MM-yyyy", new Date());
            if (isValid(parsedDate) && isWithinInterval(parsedDate, VALID_INTERVAL)) {
                setInputs((i) => ({ ...i, date: parsedDate }));
                return;
            }
        }

        // else, just update date input with the raw value
        setInputs((i) => ({ ...i, date: dateInput }));
        return;
    };

    const handleConfirm = async () => {
        setShowConfirmModal(false);
        try {
            updateBookingStatus(bookingData._id, BookingStatus.PENDING);
            const endDateTime = addHours(inputs.time, 2);
            Meteor.call("update_booking_details", bookingData._id, {
                bookingLocation: inputs.location,
                bookingStartDateTime: inputs.time,
                bookingEndDateTime: endDateTime,
            });
            navigate("/profile");
        } catch (error) {
            console.error("Error changing booking status:", error);
        }
    };
    const handleCancel = () => {
        setShowConfirmModal(false);
    };

    // for representing date object as DD-MM-YYYY in the date input
    const formatDateInput = (dateInput) => {
        // if the input is a valid date and a date object, format it
        if (isValid(dateInput) && isDate(dateInput)) return format(dateInput, "dd-MM-yyyy");

        return dateInput;
    };

    const availableTimes = getAvailableTimes({ date: inputs.date, duration: duration, bookings: bookings });

    if (isLoading) {
        // is loader, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader loadingText={"loading . . ."} isLoading={isLoading} size={100} speed={1.5} />
            </WhiteBackground>
        );
    } else {
        // service data for this service ID is not found
        if (!serviceDetails) {
            return (
                <WhiteBackground>
                    <div className="flex flex-col gap-y-6 items-center justify-center">
                        <span className={"large-text"}>Service is not found </span>

                        <Button
                            className={"bg-secondary-purple hover:bg-secondary-purple-hover"}
                            onClick={() => navigateTo("/" + UrlBasePath.SERVICES)}
                        >
                            Back to all services
                        </Button>
                    </div>
                </WhiteBackground>
            );
        } else {
            return (
                <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                    {/* TODO: implement back button functionality when implementing the actual work flow to get to this page */}
                    <PreviousButton />

                    {/* Main container for content */}
                    <div className="flex flex-col gap-4 xl:px-40">
                        <div className="large-text">{isChangeRequest ? "Request Booking Change" : "Request Booking"}</div>
                        {bookingData && (
                            <ServiceDetailsHeader
                                service={bookingData.serviceName}
                                type={bookingData.serviceType || "N/A"}
                                artist={bookingData.artistUsername || "N/A"}
                                price={bookingData.bookingPrice}
                            />
                        )}
                        {/* input form */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4">
                                {/* location */}
                                <AddressAutofill accessToken="pk.eyJ1IjoibWFzdGVyY2hpZWYwIiwiYSI6ImNsdzdtMXAyZzBtdWgyc280Z2wycHlzZXEifQ.X3CmBWszdI4h1y0vri5KsA">
                                    <Input
                                        id={locationInputId}
                                        label={
                                            <label htmlFor={locationInputId} className="main-text text-our-black">
                                                Location
                                            </label>
                                        }
                                        className="location"
                                        placeholder={isChangeRequest ? bookingData.bookingLocation : "Please insert your service address"}
                                        name="location"
                                        autoComplete="street-address"
                                        value={address.street}
                                        onChange={(e) => {
                                            handleStreet(e);
                                            setLocationError("");
                                        }}
                                    />
                                    <Input
                                        className="location"
                                        value={address.suburb}
                                        onChange={handleSuburb}
                                        autoComplete="address-level2"
                                        style={{ opacity: 0, height: 1, width: 1 }}
                                    />
                                    <Input
                                        className="location"
                                        value={address.state}
                                        onChange={handleState}
                                        autoComplete="address-level1"
                                        style={{ opacity: 0, height: 1, width: 1 }}
                                    />
                                    <Input
                                        className="location"
                                        value={address.post}
                                        onChange={handlePost}
                                        autoComplete="postal-code"
                                        style={{ opacity: 0, height: 1, width: 1 }}
                                    />
                                </AddressAutofill>
                                {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
                                {/* date/time */}
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    {/* date input + calendar */}
                                    <div className="flex flex-col flex-grow gap-1 md:max-w-[350px] lg:max-w-[420px] xl:lg:max-w-[490px]">
                                        <div className="flex flex-col gap-4">
                                            <Input
                                                id={dateInputId}
                                                label={
                                                    <label htmlFor={dateInputId} className="main-text text-our-black">
                                                        Select Date
                                                    </label>
                                                }
                                                placeholder="DD-MM-YYYY"
                                                name="date"
                                                value={formatDateInput(inputs.date) || ""}
                                                onChange={handleManualDateInput}
                                            />
                                            {/* calendar component */}
                                            <AvailabilityCalendar
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
                                                    const availableTimes = getAvailableTimes({
                                                        date: new Date(date),
                                                        duration: duration,
                                                        bookings: bookings,
                                                    });
                                                    if (view === "month" && availableTimes.length > 0) {
                                                        return "available";
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* available time buttons */}
                                    {/* <div className="flex sm:flex-grow sm:justify-center"> */}
                                    <div className="flex flex-col flex-grow gap-1">
                                        <label htmlFor={timeInputId} className="main-text text-our-black">
                                            Select Start Time (Duration: {duration}hr)
                                        </label>
                                        <div id={timeInputId} className="grid grid-cols-2 gap-2">
                                            {/* if there are available times, render the time input buttons */}
                                            {!Array.isArray(availableTimes) || availableTimes.length === 0 ? (
                                                <span className={"main-text text-dark-grey text-center col-span-2 mt-4"}>No available times</span>
                                            ) : (
                                                availableTimes.map((time) => {
                                                    const baseStyle = "w-full";
                                                    const activeStyle = "bg-dark-grey text-white hover:bg-dark-grey";
                                                    const className = isEqual(inputs.time, time) ? `${baseStyle} ${activeStyle}` : baseStyle;

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
                                                            {format(time, "p")}
                                                        </Button>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>

                                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 w-fit justify-center" type="submit">
                                    {isChangeRequest ? (
                                        "Submit Changes"
                                    ) : (
                                        <>
                                            Next Step
                                            <ArrowRightIcon className="icon-base" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Modal open={showConfirmModal} onClose={handleCancel} center>
                        <h2>Confirm Booking Changes</h2>
                        <p>Are you sure you want to submit these changes?</p>
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleCancel} className="mr-2">
                                Cancel
                            </Button>
                            <Button onClick={handleConfirm} className="bg-secondary-purple hover:bg-secondary-purple-hover">
                                Confirm
                            </Button>
                        </div>
                    </Modal>
                </WhiteBackground>
            );
        }
    }
};

export default RequestBooking;
