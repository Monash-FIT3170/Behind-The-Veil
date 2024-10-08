/**
 * File Description: Cancel Booking page
 * File version: 1.0
 * Contributors: Anusha Yadav
 */

import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import {CheckIcon, NoSymbolIcon} from "@heroicons/react/24/outline"

import BookingCollection from "/imports/api/collections/bookings";
import ServiceCollection from "../../../../api/collections/services";
import UserCollection from "../../../../api/collections/users";

import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import Button from "../../button/Button";
import BackButton from "../../button/BackButton";
import BookingStatusConfirmModal from "../../booking/BookingStatusConfirmModal";
import Loader from "../../loader/Loader";
import {useUserInfo} from "/imports/ui/components/util"
import BookingStatus from "../../../enums/BookingStatus";
import PreviousButton from "../../button/PreviousButton";

/**
 * Page for user to cancel a booking
 */

const CancelBooking = () => {
    const navigateTo = useNavigate();

    const [inputReason, setInputReason] = useState("");
    const [errors, setErrors] = useState("");
    const userInfo = useUserInfo();

    // confirmation modal attributes
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    function handleInputChange(event) {
        setInputReason(event.target.value);
    }

    function handleCancelBooking(event) {
        event.preventDefault();
        let newErrors = {};
        let isError = false;

        // Check for empty fields in each field. Make sure nothing is empty
        if (!inputReason.trim()) {
            newErrors.inputReason = "Please input a reason";
            isError = true;
        }

        // Update errors state with new error messages
        setErrors(newErrors);

        // Proceed if there are no errors
        if (!isError) {
            onOpenModal()
        }
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
    let artistData = useTracker(() => {
        if (bookingData && bookingData.artistUsername) {
            return UserCollection.find({ username: bookingData.artistUsername }).fetch()[0];
        }
        return null;
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
                    <PreviousButton />
                    {/* Main container for content */}
                    <div className="flex flex-col gap-4 xl:px-40">
                        <div className="large-text">Cancel Booking Form</div>
                        <ServiceDetailsHeader
                            service={serviceData.serviceName}
                            date={bookingDatetime.toLocaleString()}
                            artist={artistData.profile.alias + " (@" + bookingData.artistUsername + ")"}
                            price={bookingData.bookingPrice}
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
                            {errors.inputReason && <span className="text-cancelled-colour">{errors.inputReason}</span>}
                        </div>

                        {/* button */}
                        <div className="flex gap-10">
                            {/* button */}
                            <div className="flex flex-col gap-4 grow">
                                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                                        onClick={handleCancelBooking}>
                                    <CheckIcon className="icon-base"/>
                                    Confirm Cancellation
                                </Button>
                            </div>
                        </div>
                    </div>

                    <BookingStatusConfirmModal open={open}
                                               closeHandler={onCloseModal}
                                               bookingId={bookingId}
                                               toBeStatus={BookingStatus.CANCELLED}
                                               cancelAttributes={{cancelReason : inputReason, cancelUser: userInfo.username}}/>
                </WhiteBackground>
            );
        }
    }
};
export default CancelBooking;
