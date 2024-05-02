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
    // TODO: remove mock data for hard coded details
    const formatDateString = (dateString, timeString, serviceDuration) => {
        // format the time and add service duration to it
        const [time, period] = timeString.split(/(?=[ap]m)/);
        const [hours, minutes] = time.split(':');
        let hoursNum = parseInt(hours, 10);
        const minutesNum = parseInt(minutes, 10);
        if (period === 'pm' && hoursNum !== 12) {
            hoursNum += 12;
        } else if (period === 'am' && hoursNum === 12) {
            hoursNum = 0;
        }
        hoursNum += serviceDuration;
        const formattedHours = String(hoursNum).padStart(2, '0');
        const newTimeString = `${formattedHours}:${minutes}${period}`;

        // format the date
        const date = new Date(dateString);
        console.log(new Date(timeString))
        const weekDay = days[date.getDay()];

        return `${weekDay} ${dateString} ${timeString} - ${newTimeString}`;
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
            'Date': formatDateString(date, time, 2),
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
                    Object.keys(queryData()).map((key, index) => {
                        return <FormOutput key={index} label={key} input={queryData()[key]}></FormOutput>
                    })
                }
                <FormOutput className='deposit-input' key={queryData().length} label='Deposit Required' input='$60.00' deposit="text-cancelled-colour" />
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