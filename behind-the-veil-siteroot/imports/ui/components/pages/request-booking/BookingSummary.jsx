/**
 * File Description: Review the booking details summary page
 * File version: 1.0
 * Contributors: Josh
 */
import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import {useNavigate} from "react-router-dom";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import FormOutput from "./FormOutput";
import "./booking.css"
const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const BookingSummary = () => {

    const formatDateString = (dateString, timeString, serviceDuration) => {
        // format the time and add the duration
        let dateTimeStr = dateString + " " + timeString;
        let startDate = new Date(dateTimeStr);
        let endDate = new Date(startDate.getTime() + serviceDuration * 60 * 60 * 1000);

        const options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        const day = days[startDate.getDay()];
        const startFormatted = startDate.toLocaleString('en-US', options);
        const endFormatted = endDate.toLocaleString('en-US', options);

        return `${day} ${dateString} ${startFormatted} - ${endFormatted}`;
    }

    let queryData = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const location = urlParams.get('location');
        const date = urlParams.get('date');
        const time = urlParams.get('time');

        return {
            'Bride Name': 'Jane Doe',
            'Artist Name': 'Alice Tran',
            'Service': 'Bachelorette Glam Experience',
            'Location': location,
            'Date': formatDateString(date, time, 2), // hardcoded to be 2 hour duration can be dynamic
            'Total Price': '$120.00',
        }
    }
    const navigateTo = useNavigate()
    return (
        <WhiteBackground>
            <Button className="bg-transparent text-dark-grey flex gap-2" onClick={() => navigateTo('/request-booking')}>
                <ArrowLeftIcon className="size-6"/>
                Back
            </Button>
            <div className="flex flex-col gap-6 xl:px-40">
                <div className="large-text">Booking Summary</div>
                {
                    // key and key value
                    Object.keys(queryData()).map((key, index) => {
                        // key = "bride name" and input = "jane doe"
                        return <FormOutput key={index} textColor="text-dark-grey" label={key} input={queryData()[key]}></FormOutput>
                    }) // <div class="some-name" id="id2" style="display: none;"></div>
                }
                <FormOutput className='deposit-input' key={queryData().length} label='Deposit Required' input='$60.00' textColor="text-cancelled-colour" />
                <br></br>
                <Button
                className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                type="submit"
            >
                Continue
                <ArrowRightIcon className="size-6"/>
            </Button>

            </div>
        </WhiteBackground>
);
}
export default BookingSummary;