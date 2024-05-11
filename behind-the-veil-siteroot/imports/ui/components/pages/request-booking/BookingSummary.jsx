/**
 * File Description: Review the booking details summary page
 * File version: 1.0
 * Contributors: Neth
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FormOutput from "./FormOutput";
import "./booking.css";
// Array of days for date formatting
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Component for displaying booking summary and allowing continuation to the next step.
 */
const BookingSummary = () => {
    const tipText = "Full deposit for a service is required. If the booking is cancelled or rejected, the full fee will be refunded.";
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
        let endDate = new Date(startDate.getTime() + serviceDuration * 60 * 60 * 1000);

        // Options for date formatting
        const options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        // Get day of the week from start date
        const day = days[startDate.getDay()];
        // Format start and end dates
        const startFormatted = startDate.toLocaleString('en-AU', options);
        const endFormatted = endDate.toLocaleString('en-AU', options);

        return [startDate, endDate, `${day} ${dateString} ${startFormatted} - ${endFormatted}`];
    };

    /**
     * Function to retrieve query data from URL parameters.
     * @returns {Object} - Object containing booking details.
     */
    const queryData = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Extract location, date, and time from URL parameters
        const location = urlParams.get('location');
        const date = urlParams.get('date');
        const time = urlParams.get('time');

        // TODO: bride and artist details should be queried from database
        return {
            'Bride Name': 'Jane Doe',
            'Artist Name': 'Alice Tran',
            'Service': 'Bachelorette Glam Experience',
            'Location': location,
            'Date': getStartAndEndDate(date, time, 2), // Hardcoded to be 2-hour duration, can be dynamic
            'Total Price': '$120.00',
        };
    };

    /**
     * Function to handle form submission.
     * Passes the form data to the next page via the URL.
     */
    const handleSubmit = () => {
        // pass the data to the next page via the url
        const query = new URLSearchParams(queryData()).toString();
        console.log(query)
        // TODO: Navigate to payment page
    }

    // Navigate hook for redirecting to another page
    const navigateTo = useNavigate();

    return (
        <WhiteBackground>
            {/* Back button */}
            <Button className="bg-transparent text-dark-grey flex gap-2" onClick={() => navigateTo('/request-booking')}>
                <ArrowLeftIcon className="size-6"/>
                Back
            </Button>
            {/* Booking summary */}
            <div className="flex flex-col gap-6 xl:px-40">
                <div className="large-text">Booking Summary</div>
                {/* Display booking details */}
                {Object.keys(queryData()).map((key, index) => {
                    let value = queryData()[key]
                    if (key === 'Date') {
                        value = value[2]
                    }
                    return <FormOutput key={index} textColor="text-dark-grey" haveHelpText={false} label={key} input={value}></FormOutput>;
                })}
                {/* Display deposit required */}
                <FormOutput className='deposit-input' key={queryData().length} label='Deposit Required' input='$60.00' textColor="text-cancelled-colour" haveHelpText={true} tipText={tipText}/>
                <br />
                {/* Continue button */}
                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2" type="submit" onClick={handleSubmit}>
                    Continue
                    <ArrowRightIcon className="size-6"/>
                </Button>
            </div>
        </WhiteBackground>
    );
};

export default BookingSummary;
