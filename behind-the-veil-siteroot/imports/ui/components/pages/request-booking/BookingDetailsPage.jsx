/**
 * File Description: Review the booking details page
 * File version: 1.2
 * Contributors: Glenn, Nikki
 */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowPathIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    NoSymbolIcon,
    PaperAirplaneIcon,
    PencilSquareIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground";
import Button from "../../button/Button";
import FormOutput from "./FormOutput";
import MarkerMap from "../../map/MarkerMap";
import BackButton from "../../button/BackButton";
import {useUserInfo} from "../../util";
import BookingStatus from "../../../enums/BookingStatus";
import PageLayout from "../../../enums/PageLayout";
import Loader from "../../loader/Loader";
import classNames from "classnames";
import BookingStatusDisplay from "../../booking/BookingStatusDisplay";
import { useSpecificBooking } from "../../DatabaseHelper";
import UrlBasePath from "../../../enums/UrlBasePath";
import BookingStatusConfirmModal from "../../booking/BookingStatusConfirmModal";

/**
 * Component for displaying booking summary and allowing continuation to the next step.
 */
const BookingDetailsPage = () => {
    // Navigate hook for redirecting to another page
    const navigateTo = useNavigate();
    const userInfo = useUserInfo();

    if (userInfo.type === "artist") {
        navigateTo(`/${UrlBasePath.HOME}`);
    }

    // grab the service ID from the URL
    const { bookingId } = useParams();

    // confirmation modal attributes
    const [open, setOpen] = useState(false);
    const [toBeStatus, setToBeStatus] = useState(null);
    const onOpenModal = (status) => {
        setToBeStatus(status);
        setOpen(true);
    };
    const onCloseModal = () => setOpen(false);

    // get bookings information from database
    const { isLoading, bookingData, serviceData, userData } = useSpecificBooking(bookingId, userInfo.type);
    const requestChange = () => {
        navigateTo(`/services/request-change/${bookingId}`);
    };
    // navigate to the review page
    const navigateReview = () => {
        // add the booking id at the end of the url
        navigateTo(`/profile/review/${bookingId}`);
    };

    if (isLoading) {
        // is loading, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader loadingText={"Booking details are loading . . ."} isLoading={isLoading} size={100} speed={1.5} />
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

                        <Button
                            className={"bg-secondary-purple hover:bg-secondary-purple-hover"}
                            onClick={() => navigateTo("/" + UrlBasePath.PROFILE)}
                        >
                            Back to my profile
                        </Button>
                    </div>
                </WhiteBackground>
            );
        } else {
            // if user is artist, only display bride information (vice versa) - separated for readability
            let otherUserDiv;

            if (userInfo.type === "bride") {
                otherUserDiv = (
                    <div className="flex sm:flex-row flex-col sm:items-center">
                        <FormOutput
                            textColor="text-dark-grey"
                            label="Artist"
                            input={userData ? userData.profile.alias + " (@" + bookingData.artistUsername + ")" : "deleted user"}
                        />

                        <Button
                            className="flex flex-row justify-center items-center gap-x-1.5 max-h-9
                        mt-2 sm:mt-0 sm:ml-10 sm:-mb-3.5 md:min-w-36 md:w-36 sm:-translate-y-1.5"
                            onClick={() => navigateTo("/messages#" + bookingData.artistUsername)}
                        >
                            <PaperAirplaneIcon className="size-5 min-h-5 min-w-5 stroke-1.5" />
                            <span className={"flex sm:hidden md:flex small-text"}>Message</span>
                        </Button>
                    </div>
                );
            } else {
                otherUserDiv = (
                    <div className="flex sm:flex-row flex-col sm:items-center">
                        <FormOutput
                            textColor="text-dark-grey"
                            label="Bride"
                            input={userData ? userData.profile.alias + " (@" + bookingData.brideUsername + ")" : "deleted user"}
                        />

                        <Button
                            className="flex flex-row justify-center items-center gap-x-1.5 max-h-9
                        mt-2 sm:mt-0 sm:ml-10 sm:-mb-3.5 md:min-w-36 md:w-36 sm:-translate-y-1.5"
                            onClick={() => navigateTo("/messages#" + bookingData.brideUsername)}
                        >
                            <PaperAirplaneIcon className="size-5 min-h-5 min-w-5 stroke-1.5" />
                            <span className={"flex sm:hidden md:flex small-text"}>Message</span>
                        </Button>
                    </div>
                );
            }

            // convert date string into a date
            const bookingDatetime = new Date(bookingData.bookingStartDateTime);
            const now = new Date();

            // calculate number of hours for service
            const endDate = new Date(bookingData.bookingEndDateTime);
            const durationHours = (endDate - bookingDatetime) / (1000 * 60 * 60);

            // set the action buttons
            let actionButtons = [];
            const buttonClass = "flex flex-row gap-x-2 justify-center items-center w-3/4 max-w-96 xl:w-60 min-w-40";
            const purpleButtonClass = classNames(buttonClass, "bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500");

            if (userInfo.type === "bride") {
                // todo: once bookings are actual do more logic for the buttons such as checking dates,
                switch (bookingData.bookingStatus) {
                    case BookingStatus.COMPLETED:
                        // if booking is completed, add a "Leave review" or "View review" button
                        if (!bookingData.bookingIsReviewed) {
                            // if not reviewed yet
                            actionButtons.push(
                                <Button className={purpleButtonClass} onClick={navigateReview}>
                                    <PencilSquareIcon className="icon-base" />
                                    Leave Review
                                </Button>
                            );
                        } else {
                            // if already left review
                            actionButtons.push(
                                <Button className={purpleButtonClass} onClick={navigateReview}>
                                    <DocumentTextIcon className="icon-base" />
                                    View Review
                                </Button>
                            );
                        }
                        break;
                    case BookingStatus.CONFIRMED:
                    case BookingStatus.OVERDUE:
                        // if booking is confirmed add a "service completed" button if over the date
                        // if a booking is confirmed, add a "request change" and "cancel" button if not yet the date
                        if (bookingDatetime < now) {
                            // is current time AFTER specified booking time
                            // if booking time already passed (in the past)
                            actionButtons.push(
                                <Button
                                    className={purpleButtonClass}
                                    onClick={() => {
                                        onOpenModal(BookingStatus.COMPLETED);
                                    }}
                                >
                                    <CurrencyDollarIcon className="icon-base" />
                                    Service Completed
                                </Button>
                            );
                            actionButtons.push(
                                <Button className={buttonClass} onClick={() => navigateTo("/cancel-booking/" + bookingId)}>
                                    <NoSymbolIcon className="icon-base" />
                                    Cancel
                                </Button>
                            );
                        } else {
                            // if booking datetime has not passed yet (in the future)
                            actionButtons.push(
                                <Button className={purpleButtonClass} onClick={requestChange}>
                                    <ArrowPathIcon className="icon-base" />
                                    Request change
                                </Button>
                            );
                            actionButtons.push(
                                <Button className={buttonClass} onClick={() => navigateTo("/cancel-booking/" + bookingId)}>
                                    <NoSymbolIcon className="icon-base" />
                                    Cancel
                                </Button>
                            );
                        }
                        break;
                    case BookingStatus.PENDING:
                        // if a booking is pending, add a "request change" and "cancel" button
                        actionButtons.push(
                            <Button className={purpleButtonClass}>
                                <ArrowPathIcon className="icon-base" />
                                Request change
                            </Button>
                        );
                        actionButtons.push(
                            <Button className={buttonClass} onClick={() => navigateTo("/cancel-booking/" + bookingId)}>
                                <NoSymbolIcon className="icon-base" />
                                Cancel
                            </Button>
                        );
                        break;
                }
            } else if (userInfo.type === "artist") {
                switch (bookingData.bookingStatus) {
                    case BookingStatus.CONFIRMED:
                        // if a booking is confirmed, add a "cancel" button if not yet the date
                        if (bookingDatetime >= now) {
                            // checks that service date is after now (not yet)
                            // if booking date has not passed yet
                            actionButtons.push(
                                <Button className={buttonClass} onClick={() => navigateTo("/cancel-booking/" + bookingId)}>
                                    <NoSymbolIcon className="icon-base" />
                                    Cancel
                                </Button>
                            );
                        }
                        break;
                    case BookingStatus.OVERDUE:
                        // if a booking is overdue, add a "cancel" button if not yet the date
                        actionButtons.push(
                            <Button className={buttonClass} onClick={() => navigateTo("/cancel-booking/" + bookingId)}>
                                <NoSymbolIcon className="icon-base" />
                                Cancel
                            </Button>
                        );
                        break;
                    case BookingStatus.PENDING:
                        // if a booking is pending, add "accept" and "reject" buttons
                        actionButtons.push(
                            <Button
                                className={purpleButtonClass}
                                onClick={() => {
                                    onOpenModal(BookingStatus.CONFIRMED);
                                }}
                            >
                                <CheckCircleIcon className="icon-base" />
                                Accept
                            </Button>
                        );
                        actionButtons.push(
                            <Button
                                className={buttonClass}
                                onClick={() => {
                                    onOpenModal(BookingStatus.REJECTED);
                                }}
                            >
                                <XCircleIcon className="icon-base" />
                                Reject
                            </Button>
                        );
                        break;
                }
            }

            // set up cancelled information section IF cancelled
            let cancelDetailsDiv = null;
            if (bookingData.cancelReason && bookingData.cancelUser) {
                cancelDetailsDiv = (
                    <>
                        <FormOutput textColor="text-dark-grey" label="Cancelled User: " input={bookingData.cancelUser} />

                        <FormOutput textColor="text-dark-grey" label="Cancelled Reason: " input={bookingData.cancelReason} />
                    </>
                );
            }

            return (
                <WhiteBackground>
                    {/* Back button */}
                    <BackButton to={"/profile"} />

                    {/* Main container for content */}
                    <div className={"flex flex-col xl:flex-row"}>
                        {/* booking status display on the top right */}
                        <BookingStatusDisplay
                            className={"hidden sm:flex absolute right-0 mr-16 md:mr-20 lg:mr-40"}
                            bookingStatus={bookingData.bookingStatus}
                        />

                        {/*Left div of booking information*/}
                        <div className="flex flex-col gap-6 md:px-20 lg:px-40 xl:pr-10 xl:w-2/3">
                            <div className="large-text">Booking Details</div>

                            {/* Display booking details */}
                            <FormOutput
                                className={"flex sm:hidden"}
                                textColor="text-dark-grey"
                                label="Status"
                                input={<BookingStatusDisplay className={"mb-0"} bookingStatus={bookingData.bookingStatus} />}
                            />

                            <FormOutput textColor="text-dark-grey" label="Ref" input={bookingData._id} />

                            {/*either bride or artist information + message button*/}
                            {otherUserDiv}

                            <FormOutput
                                textColor="text-dark-grey"
                                label="Service"
                                input={serviceData.serviceName} // todo service name
                            />
                            <FormOutput textColor="text-dark-grey" label="Location" input={bookingData.bookingLocation} />
                            <FormOutput textColor="text-dark-grey" label="Date" input={bookingDatetime.toLocaleString()} />

                            <FormOutput
                                textColor="text-dark-grey"
                                haveHelpText={true}
                                tipText={"Duration does not include travel. It is the required time to performing the service for the bride."}
                                label={"Duration"}
                                input={durationHours + " hours"}
                            ></FormOutput>

                            <FormOutput textColor="text-dark-grey" label="Price" input={"$" + bookingData.bookingPrice} />

                            <FormOutput textColor="text-dark-grey" label="Description" input={serviceData.serviceDesc} />

                            {cancelDetailsDiv}

                            {/*map*/}
                            <div className={"xl:hidden flex flex-col gap-6"}>
                                <MarkerMap location={bookingData.bookingLocation} />

                                {/* action buttons (such as reject, cancel, etc) */}
                                <div className="flex flex-col items-center justify-center gap-y-2 w-full">{actionButtons}</div>
                            </div>
                        </div>

                        {/* div on the right only on very large (xl) screens*/}
                        <div className="hidden xl:flex flex-col gap-y-6 h-full w-1/3 items-center justify-end mt-10 bottom-0">
                            {/*map*/}
                            <MarkerMap location={bookingData.bookingLocation} />

                            {/* action buttons (such as reject, cancel, etc) */}
                            <div className="flex flex-col items-center justify-center gap-y-2 w-full">{actionButtons}</div>
                        </div>
                    </div>

                    <BookingStatusConfirmModal open={open} closeHandler={onCloseModal} bookingId={bookingId} toBeStatus={toBeStatus} />
                </WhiteBackground>
            );
        }
    }
};
export default BookingDetailsPage;
