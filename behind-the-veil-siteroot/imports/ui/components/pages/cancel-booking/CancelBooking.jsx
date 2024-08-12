/**
 * File Description: Cancel Booking page
 * File version: 1.0
 * Contributors: Anusha Yadav
 */

import React, {useState} from "react";
import {useParams} from "react-router-dom";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {CheckIcon} from "@heroicons/react/24/outline"
import BackButton from "../../button/BackButton";

/**
 * Page for user to cancel a booking
 */

const CancelBooking = () => {
    const MOCK_CANCEL_BOOKING_DETAILS = {
        service: "Bachelorette Glam Experience",
        date: "Tuesday, 12 May, 2024",
        artist: "Jane Doe",
        price: "$120"
    }

    const [inputReason, setInputReason] = useState("");

    function handleInputChange(event) {
        setInputReason(event.target.value);
    }

    function handleCancelBooking(event) {
        event.preventDefault()
        alert("Cancelling booking for reason: " + inputReason);
    }

    // grab the service ID from the URL
    const {bookingId} = useParams();

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton to={"/profile"}/>

            {/* Main container for content */}
            <div className="flex flex-col gap-4 xl:px-40">
                <div className="large-text">Cancel Booking</div>
                <ServiceDetailsHeader
                    service={MOCK_CANCEL_BOOKING_DETAILS.service}
                    date={MOCK_CANCEL_BOOKING_DETAILS.date}
                    artist={MOCK_CANCEL_BOOKING_DETAILS.artist}
                    price={MOCK_CANCEL_BOOKING_DETAILS.price}
                />

                {/* cancellation reason */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="cancellation-input" className="main-text text-our-black">Reason of
                        cancellation</label>
                    <textarea id="cancellation-input"
                              className="input-base h-48"
                              placeholder="Enter Your Reason"
                              onChange={handleInputChange}
                              rows={4} cols={40}/>
                </div>

                {/* button */}
                <div className="flex gap-10">
                    {/* button */}
                    <div className="flex flex-col gap-4 grow">
                        <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                                onClick={handleCancelBooking}>
                            <CheckIcon className="icon-base"/>
                            Cancel Booking
                        </Button>
                    </div>
                </div>
            </div>

        </WhiteBackground>
    );
};
export default CancelBooking;
