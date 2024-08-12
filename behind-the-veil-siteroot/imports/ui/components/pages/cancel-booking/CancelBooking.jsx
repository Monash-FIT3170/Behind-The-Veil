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
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import Loader from "../../loader/Loader";
import {getUserInfo} from "/imports/ui/components/util"

import BookingCollection from "/imports/api/collections/bookings";
import ServiceCollection from "../../../../api/collections/services";
import UserCollection from "../../../../api/collections/users";

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
    const userInfo = getUserInfo();

    function handleInputChange(event) {
        setInputReason(event.target.value);
    }

    function handleCancelBooking(event) {
        event.preventDefault()
        alert("Cancelling booking for reason: " + inputReason);
    }

    // grab the service ID from the URL
    const {bookingId} = useParams();

    // get bookings information from database
    const isLoadingBooking = useSubscribe('specific_booking', bookingId);

    let bookingData = useTracker(() => {
        return BookingCollection.find().fetch()[0];
    });

    // load the service's data
    const isLoadingService = useSubscribe('specific_service', bookingData ? bookingData.serviceId : "");

    // load the artist's data
    const isLoadingUser = useSubscribe('specific_user', bookingData ? bookingData.artistUsername : "");

    // data trackers
    let serviceData = useTracker(() => {
        return ServiceCollection.find().fetch()[0];
    });

    // data trackers
    let userData = useTracker(() => {
        return UserCollection.find().fetch()[0];
    });

    const isLoading = isLoadingBooking() || isLoadingService() || isLoadingUser();

    if (isLoading) {
        // is loading, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader
                    loadingText={"loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );
    } else {
        // finished loading
        if (!bookingData || (userInfo.username !== bookingData.artistUsername && userInfo.username !== bookingData.brideUsername)) {
            // if booking data for this booking ID is not found OR this booking doesn't belong to the current user
            return (
                <WhiteBackground>
                    <div className="flex flex-col gap-y-6 items-center justify-center">
                        <span className={"large-text"}>Booking is not found </span>

                        <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover"}
                                onClick={() => navigateTo("/profile")}>
                            Back to my profile
                        </Button>
                    </div>
                </WhiteBackground>
            );
        } else {
            // convert date string into a date
            const bookingDatetime = new Date(bookingData.bookingStartDateTime);
            return (
                <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                    <BackButton to={"/profile"}/>

                    {/* Main container for content */}
                    <div className="flex flex-col gap-4 xl:px-40">
                        <div className="large-text">Cancel Booking</div>
                        <ServiceDetailsHeader
                            service={serviceData.serviceName}
                            date={bookingDatetime.toLocaleString()}
                            artist={userData.profile.alias + " (@" + bookingData.artistUsername + ")"}
                            price={"$" + bookingData.bookingPrice}
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
        }
    }
};
export default CancelBooking;
