/**
 * File Description: Review the booking details summary page
 * File version: 1.1
 * Contributors: Neth, Josh
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import FormOutput from "./FormOutput";
import {addHours, enAU, format} from "date-fns";
import PreviousButton from "../../button/PreviousButton";
import {useUserInfo} from "../../util";
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * Component for displaying booking summary and allowing continuation to the next step.
 */
const BookingSummary = () => {
    // Navigate hook for redirecting to another page
    const navigateTo = useNavigate();
    const userInfo = useUserInfo();

    if (userInfo.type === "artist") {
        navigateTo(`/${UrlBasePath.HOME}`);
    }

    // grab the service ID from the URL
    const {serviceId} = useParams();

    const tipText = "Full deposit for a service is required. If the booking is cancelled or rejected, the full fee will be refunded.";
    /**
     * Function to calculate start and end dates based on input dateTime and service duration.
     * @param {string} startDateTime - Date object of the starting time of the booking
     * @param {number} serviceDuration - Duration of service in hours.
     * @returns {Array<Date>} - Array containing start date, end date, and formatted date range string.
     */
    const getStartAndEndDate = (startDateTime, serviceDuration) => {
        const endDateTime = addHours(startDateTime, serviceDuration);

        // format day in the form of: "Thu 21/03/23"
        const dayString = format(startDateTime, 'E P', { locale: enAU });

        // format time interval in the form of: "10:00 AM - 12:00 PM"
        const timeIntervalString = `${format(startDateTime, 'p', { locale: enAU })} - ${format(endDateTime, 'p', { locale: enAU })}`;

        // formatted string is in the form of: "Thu 21/03/23 10:00 AM - 12:00 PM"
        const formattedString = `${dayString} ${timeIntervalString}`;

        return [startDateTime, endDateTime, formattedString];
    };

    const urlParams = new URLSearchParams(window.location.search);

    /**
     * Function to retrieve query data from URL parameters.
     * @returns {Object} - Object containing booking details.
     */
    const queryData = () => {
        // Extract date, and time from URL parameters
        const dateTime = urlParams.get('time');
        const duration = urlParams.get('duration');

        return {
            'brideName': userInfo.alias,
            'Artist Name': urlParams.get('artistName'),
            'Service': urlParams.get('serviceName'),
            'Location': urlParams.get('location'),
            'Date': getStartAndEndDate(dateTime, Number(duration)),
            'Total Price': `$${urlParams.get('price')}`,
        };
    };

    /**
     * Function to handle form submission.
     * Passes the form data to the next page via the URL.
     */
    const handleSubmit = () => {
        // pass the data to the next page via the url
        const oldQuery = queryData();
        const newQuery = {
            artistUsername: urlParams.get('artistUsername'),
            brideUsername: userInfo.username,
            service: oldQuery['Service'],
            location: oldQuery['Location'],
            date: oldQuery['Date'],
            totalPrice: oldQuery['Total Price'],
        }
        const query = new URLSearchParams(newQuery).toString();
        navigateTo(`/${UrlBasePath.SERVICES}/${serviceId}/payment-details?${query}`);
    }

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
                    return <FormOutput key={key} textColor="text-dark-grey" haveHelpText={false} label={key} input={value}></FormOutput>;
                })}
                {/* Display deposit required */}
                <FormOutput className='deposit-input' key={queryData().length} label='Deposit Required' input={queryData()["Total Price"]} textColor="text-cancelled-colour" haveHelpText={true} tipText={tipText} />
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
