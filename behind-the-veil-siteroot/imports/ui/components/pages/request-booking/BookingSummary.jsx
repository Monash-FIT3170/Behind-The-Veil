/**
 * File Description: Review the booking details summary page
 * File version: 1.1
 * Contributors: Neth, Josh
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FormOutput from "./FormOutput";
import { addHours, format, enAU } from "date-fns";
import PreviousButton from "../../button/PreviousButton";

/**
 * Component for displaying booking summary and allowing continuation to the next step.
 */
const BookingSummary = () => {

    const tipText = "Full deposit for a service is required. If the booking is cancelled or rejected, the full fee will be refunded.";
    /**
     * Function to calculate start and end dates based on input dateTime and service duration.
     * @param {Date} startDateTime - Date object of the starting time of the booking
     * @param {number} serviceDuration - Duration of service in hours.
     * @returns {Array<Date>} - Array containing start date, end date, and formatted date range string.
     */
    const getStartAndEndDate = (startDateTime, serviceDuration) => {
        const endDateTime = addHours(startDateTime, serviceDuration)

        // format day in the form of: "Thu 21/03/23"
        const dayString = format(startDateTime, 'E P', { locale: enAU })

        // format time interval in the form of: "10:00 AM - 12:00 PM"
        const timeIntervalString = `${format(startDateTime, 'p', { locale: enAU })} - ${format(endDateTime, 'p', { locale: enAU })}`

        // formatted string is in the form of: "Thu 21/03/23 10:00 AM - 12:00 PM"
        const formattedString = `${dayString} ${timeIntervalString}`

        return [startDateTime, endDateTime, formattedString]
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
        const dateTime = urlParams.get('time');

        // TODO: bride and artist details should be queried from database
        return {
            'Bride Name': 'Jane Doe',
            'Artist Name': 'Alice Tran',
            'Service': 'Bachelorette Glam Experience',
            'Location': location,
            'Date': getStartAndEndDate(dateTime, 2), // Hardcoded to be 2-hour duration, can be dynamic
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
        navigateTo(`/payment-details?${query}`);
    }

    // Navigate hook for redirecting to another page
    const navigateTo = useNavigate();

    return (
        <WhiteBackground>
            {/* Back button */}
            <PreviousButton/>

            {/* Booking summary */}
            <div className="flex flex-col gap-6 md:px-20 lg:px-40">
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
                <FormOutput className='deposit-input' key={queryData().length} label='Deposit Required' input='$120.00' textColor="text-cancelled-colour" haveHelpText={true} tipText={tipText} />
                <br />
                {/* Continue button */}
                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2" type="submit" onClick={handleSubmit}>
                    Continue
                    <ArrowRightIcon className="size-6" />
                </Button>
            </div>
        </WhiteBackground>
    );
};

export default BookingSummary;
