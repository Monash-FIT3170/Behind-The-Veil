import React, { useState, useEffect, useCallback, useId } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
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
import { ChevronRightIcon, NoSymbolIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import AvailabilityCalendar, { VALID_INTERVAL } from "../../../components/availabilityCalendar/AvailabilityCalendar.jsx";
import BookingCollection from "/imports/api/collections/bookings";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader";
import Button from "../../button/Button";
import PreviousButton from "../../button/PreviousButton";
import Loader from "../../loader/Loader";
import { useUserInfo } from "/imports/ui/components/util";
import BookingStatus from "../../../enums/BookingStatus";
import { useSpecificBooking, useSpecificService, updateBookingStatus } from "../../DatabaseHelper";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Input from "../../input/Input";
import { AddressAutofill } from "@mapbox/search-js-react";
import UrlBasePath from "../../../enums/UrlBasePath";

const RequestChangeBooking = () => {
    const userInfo = useUserInfo();
    const { bookingId } = useParams();
    const navigateTo = useNavigate();

    const { isLoading: isLoadingBooking, bookingData, serviceData: serviceDataBooking, userData } = useSpecificBooking(bookingId);

    const serviceId = bookingData?.serviceId;

    const { isLoading: isLoadingServices, serviceData, artistData, profileImageData } = useSpecificService(serviceId ?? null);

    const isLoading = isLoadingServices || isLoadingBooking;

    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    // track these artist bookings
    const artistBookings = useTracker(() => {
        return BookingCollection.find().fetch();
    });
    console.log(bookingId);
    const artistAvailability = artistData?.availability;
    const duration = serviceData?.duration ?? 1; // Default to 1 hour if not specified

    const removeMilliseconds = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    const formatDateInput = (dateInput) => {
        return isValid(dateInput) && isDate(dateInput) ? format(dateInput, "dd-MM-yyyy") : dateInput;
    };

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

    const getAvailableTimes = useCallback(
        ({ date, duration, bookings }) => {
            if (isLoading || !artistAvailability) {
                return [];
            }

            if (!(isValid(date) && isDate(date))) {
                return [];
            }
            if (!Array.isArray(bookings)) {
                return [];
            }

            const dateKey = format(date, "yyyy-MM-dd");
            const availabiltyOnDate = artistAvailability[dateKey];

            if (!Array.isArray(availabiltyOnDate) || availabiltyOnDate.length === 0) {
                return [];
            }

            const artistWorkingHours = availabiltyOnDate.map((hour) => {
                return set(date, { hours: hour, minutes: 0, seconds: 0 });
            });

            const confirmedBookings = bookings.filter((booking) => {
                return booking.bookingStatus === BookingStatus.CONFIRMED;
            });

            const availableTimes = artistWorkingHours.filter((workingHour) => {
                if (!isAfter(startOfHour(workingHour), new Date())) return false;

                const noClashWithExistingBookings = !confirmedBookings.some((booking) => {
                    return areIntervalsOverlapping(
                        { start: workingHour, end: addHours(workingHour, duration) },
                        { start: booking.bookingStartDateTime, end: booking.bookingEndDateTime }
                    );
                });

                const serviceHours = eachHourOfInterval({
                    start: workingHour,
                    end: addHours(workingHour, duration - 1),
                });

                const isArtistWorking = serviceHours.every((serviceHour) => {
                    return Boolean(artistWorkingHours.find((hr) => isEqual(removeMilliseconds(hr), removeMilliseconds(serviceHour))));
                });

                return noClashWithExistingBookings && isArtistWorking;
            });

            return availableTimes;
        },
        [isLoading, artistAvailability]
    );

    const [inputs, setInputs] = useState({
        location: "",
        date: bookingData?.bookingStartDateTime,
        time: "",
    });

    useEffect(() => {
        if (!isLoading) {
            setInputs((i) => {
                return {
                    ...i,
                    date: formatDateInput(bookingData?.bookingStartDateTime),
                };
            });
        }
    }, [isLoading]);

    const [address, setAddress] = useState({
        street: "",
        suburb: "",
        state: "",
        post: "",
    });

    const locationInputId = useId();
    const dateInputId = useId();
    const timeInputId = useId();

    useEffect(() => {
        const isEmpty = (str) => !str || str.trim() === "";

        const street = address.street;
        const suburb = address.suburb;
        const state = address.state;
        const post = address.post;
        var full = street + ", " + suburb + " " + post + ", " + state;

        if (bookingData && bookingData.bookingLocation && isEmpty(street) && isEmpty(suburb) && isEmpty(state) && isEmpty(post)) {
            full = bookingData.bookingLocation;
        }
        setInputs((i) => ({ ...i, location: full }));
    }, [address]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValid(inputs.time) && !bookingData.bookingStartDateTime) {
            alert("Please select a valid time.");
            return;
        }

        if (!(address.street && address.suburb && address.state) && !bookingData.bookingLocation) {
            alert("Please select a valid location.");
            return;
        }
        if (!bookingData.bookingLocation) {
            alert("Please select a valid location.");
            return;
        }

        const isEmpty = (str) => !str || str.trim() === "";

        const street = address.street;
        const suburb = address.suburb;
        const state = address.state;
        const post = address.post;

        var full = street + ", " + suburb + " " + post + ", " + state;

        if (isEmpty(street) && isEmpty(suburb) && isEmpty(state) && isEmpty(post)) {
            if (bookingData && bookingData.bookingLocation) {
                full = bookingData.bookingLocation;
            } else {
                alert("Please select a valid location.");
                return;
            }
        }
        // Update the inputs state with the new location
        const updatedInputs = { ...inputs, location: full };

        const bookingDetails = {
            ...updatedInputs,
            artistUsername: serviceData.artistUsername,
            artistName: artistData.profile.alias,
            price: serviceData.servicePrice,
            serviceName: serviceData.serviceName,
            duration: duration,
        };

        onOpenModal();
    };

    const confirmChanges = () => {
        setIsSubmitting(true);

        const isEmpty = (str) => !str || str.trim() === "";

        const street = address.street;
        const suburb = address.suburb;
        const state = address.state;
        const post = address.post;

        var full = street + ", " + suburb + " " + post + ", " + state;

        if (isEmpty(street) && isEmpty(suburb) && isEmpty(state) && isEmpty(post)) {
            if (bookingData && bookingData.bookingLocation) {
                full = bookingData.bookingLocation;
            }
        }

        const updatedInputs = { ...inputs, location: full };

        // First, update the booking status

        updateBookingStatus(bookingId, BookingStatus.PENDING);

        // After successful status update, update the booking details

        new Promise((resolve, reject) => {
            Meteor.callAsync("update_booking_details", bookingId, {
                bookingStartDateTime: new Date(updatedInputs.date),
                bookingEndDateTime: new Date(new Date(updatedInputs.date).getTime() + duration * 60 * 60 * 1000),
                bookingLocation: updatedInputs.location,
            })
                .then(() => {
                    setIsSubmitting(false);
                    // Navigate back to the bookings details page
                    navigateTo(`/${UrlBasePath.PROFILE}`);
                    resolve(); // Resolve the promise if everything is successful
                })
                .catch((error) => {
                    setIsSubmitting(false);
                    console.error("Error updating booking:", error);
                    alert("There was an error updating your booking. Please try again.");
                    reject(error); // Reject the promise if there's an error
                });
        })
            .then(() => {
                console.log("Booking update completed successfully");
            })
            .catch((error) => {
                console.log("Booking update failed:", error);
            });
    };
    const handleManualDateInput = (event) => {
        const dateInput = event.target.value;
        const dateFormat = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;

        if (dateFormat.test(dateInput)) {
            const parsedDate = parse(dateInput, "dd-MM-yyyy", new Date());
            if (isValid(parsedDate) && isWithinInterval(parsedDate, VALID_INTERVAL)) {
                setInputs((prev) => ({ ...prev, date: parsedDate }));
                setIsDateEdited(true);
                return;
            }
        }

        setInputs((prev) => ({ ...prev, date: dateInput }));
        setIsDateEdited(true);
    };

    const availableTimes = getAvailableTimes({
        date: inputs.date,
        duration: duration,
        bookings: artistBookings,
    });

    const findNextAvailableDate = () => {
        const currentInput = new Date(inputs.date);
        for (let i = 1; i < 365 * 3; i++) {
            const nextDate = addDays(currentInput, i);
            const availableTimes = getAvailableTimes({
                date: nextDate,
                duration: duration,
                bookings: artistBookings,
            });
            if (availableTimes.length > 0) {
                return nextDate;
            }
        }
        return null;
    };

    if (isLoading) {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader loadingText={"loading . . ."} isLoading={isLoading} size={100} speed={1.5} />
            </WhiteBackground>
        );
    }

    if (!serviceData) {
        return (
            <WhiteBackground>
                <div className="flex flex-col gap-y-6 items-center justify-center">
                    <span className={"large-text"}>Service is not found</span>
                    <Button className={"bg-secondary-purple hover:bg-secondary-purple-hover"} onClick={() => navigateTo("/" + UrlBasePath.SERVICES)}>
                        Back to all services
                    </Button>
                </div>
            </WhiteBackground>
        );
    }

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <PreviousButton />
            <div className="flex flex-col gap-4 xl:px-40">
                <div className="large-text">Request Booking Change</div>
                <ServiceDetailsHeader
                    service={serviceData.serviceName}
                    type={serviceData.serviceType}
                    artist={artistData.profile.alias}
                    price={serviceData.servicePrice}
                />
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <AddressAutofill accessToken="pk.eyJ1IjoibWFzdGVyY2hpZWYwIiwiYSI6ImNsdzdtMXAyZzBtdWgyc280Z2wycHlzZXEifQ.X3CmBWszdI4h1y0vri5KsA">
                            <Input
                                id={locationInputId}
                                label={
                                    <label htmlFor={locationInputId} className="main-text text-our-black">
                                        Location
                                    </label>
                                }
                                className="location"
                                placeholder="Input location for service: wedding venue, address, ..."
                                name="location"
                                autoComplete="street-address"
                                defaultValue={bookingData?.bookingLocation || ""}
                                onChange={handleStreet}
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

                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
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
                                        value={formatDateInput(inputs.date)}
                                        onChange={handleManualDateInput}
                                    />
                                    <AvailabilityCalendar
                                        value={isValid(inputs.date) && isDate(inputs.date) ? inputs.date : null}
                                        onChange={(date) => setInputs((i) => ({ ...i, date: date }))}
                                        tileClassName={({ date, view }) => {
                                            const availableTimes = getAvailableTimes({
                                                date: new Date(date),
                                                duration: duration,
                                                bookings: artistBookings,
                                            });
                                            if (view === "month" && availableTimes.length > 0) {
                                                return "available";
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow gap-1">
                                <label htmlFor={timeInputId} className="main-text text-our-black">
                                    Select Start Time (Duration: {duration}hr)
                                </label>
                                <div id={timeInputId} className="grid grid-cols-2 gap-2">
                                    {!Array.isArray(availableTimes) || availableTimes.length === 0 ? (
                                        <span className="main-text text-dark-grey text-center col-span-2 mt-4">No available times</span>
                                    ) : (
                                        availableTimes.map((time) => {
                                            const baseStyle = "w-full";
                                            const activeStyle = "bg-dark-grey text-white hover:bg-dark-grey";
                                            const className = isEqual(inputs.time, time) ? `${baseStyle} ${activeStyle}` : baseStyle;

                                            return (
                                                <Button
                                                    key={time.toISOString()}
                                                    className={className}
                                                    onClick={() => setInputs((i) => ({ ...i, time: time }))}
                                                >
                                                    {format(time, "p")}
                                                </Button>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="flex justify-center items-center h-full w-full">
                                    <Button
                                        className="flex flex-row gap-2 w-fit justify-center"
                                        onClick={() => {
                                            const nextDate = findNextAvailableDate();
                                            if (nextDate) {
                                                setInputs((i) => ({ ...i, date: nextDate }));
                                            } else {
                                                alert("No available dates found");
                                            }
                                        }}
                                    >
                                        Next Available Date
                                        <ChevronRightIcon className="size-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 w-fit justify-center" type="submit">
                            Confirm Changes
                            <CheckIcon className="icon-base" />
                        </Button>
                    </div>
                </form>
            </div>
            <Modal
                classNames={{
                    modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue",
                }}
                open={open}
                onClose={onCloseModal}
                center
                showCloseIcon={false}
            >
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-center title-text">Confirm Booking Changes</h2>
                        <p className="text-center medium-text">Are you sure you want to request these changes?</p>
                        <div className="flex justify-center space-x-6 mt-5">
                            <Button
                                disabled={isSubmitting}
                                className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1 load-when-disabled"
                                onClick={confirmChanges}
                            >
                                <CheckIcon className="icon-base" />
                                Confirm
                            </Button>
                            <Button className="btn-base ps-[25px] pe-[25px] flex gap-1" onClick={onCloseModal}>
                                <NoSymbolIcon className="icon-base" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </WhiteBackground>
    );
};

export default RequestChangeBooking;
