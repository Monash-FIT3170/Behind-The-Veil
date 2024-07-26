/**
 * File Description: Artist bookings tab
 * File version: 1.2
 * Contributors: Kefei (Phillip) Li, Laura, Nikki
 */

import React, {useState} from 'react';
import {PlusIcon,} from "@heroicons/react/24/outline";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import BookingCollection from "../../../../../api/collections/booking";
import ImageCollection from "../../../../../api/collections/images";
import ServiceCollection from "../../../../../api/collections/services";


import Button from "../../../button/Button";
import BookingCard from "../../../card/BookingCard";
import BookingStatus from "../../../../enums/BookingStatus";
import BookingFilter from "../../../../enums/ArtistBookingsFilter";
import BookingListView from "../../../booking/BookingListView";
import BookingCalendarView from "../../../booking/BookingCalendarView";
import Loader from "../../../loader/Loader";


/**
 * Bookings tab of an artist Tabs' profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistBookingsTab = ({username}) => {
    // booking view, calendar or list
    const [bookingView, setBookingView] = useState("list"); // todo: calendar view

    // view drop down handler
    const handleViewChange = (event) => {
        setBookingView(event.target.value);
    };

    // get bookings information from database
    const isLoadingBooking = useSubscribe('all_user_bookings', username);
    const isLoadingService = useSubscribe('all_services');
    const isLoadingServiceImage = useSubscribe('service_images');

    let bookingsData = useTracker(() => {

        return BookingCollection.find({
            $or: [
                { "brideUsername": username },
                { "artistUsername": username }
            ]
        }).fetch();
    });

    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });

    let imagesData = useTracker(() => {
        return ImageCollection.find({"imageType": "service"}).fetch();
    });

    const isLoading = isLoadingBooking() || isLoadingService() || isLoadingServiceImage();

    // manual aggregation into bookingsData with its services and images
    for (let i = 0; i < bookingsData.length; i++) {

        // aggregate with service first
        for (let j = 0; j < servicesData.length; j++) {
            // find matching service ID
            if (bookingsData[i].serviceId === servicesData[j]._id) {
                bookingsData[i].serviceName = servicesData[j].serviceName;
                bookingsData[i].serviceDesc = servicesData[j].serviceDesc;
                break;
            }
        }
        // then aggregate with the FIRST service image (cover)
        for (let j = 0; j < imagesData.length; j++) {
            // find matching image for the service
            if (imagesData[j].imageType === "service" && bookingsData[i].serviceId === imagesData[j].target_id) {
                bookingsData[i].serviceImageData = imagesData[j].imageData;
                break;
            }
        }
    }

    // filters
    const availableFilters = Object.values(BookingFilter);
    const [selectedFilter, setSelectedFilter] = useState(BookingFilter.ALL);

    const filterOptions = {
        [BookingFilter.ALL]: Object.values(BookingStatus),
        [BookingFilter.CONFIRMED]: [BookingStatus.CONFIRMED],
        [BookingFilter.PENDING]: [BookingStatus.PENDING],
        [BookingFilter.CLOSED]: [BookingStatus.COMPLETED, BookingStatus.REJECTED, BookingStatus.CANCELLED, BookingStatus.OVERDUE]
    };

    // rendering buttons for filters
    const filterButtons = (
        <div
            className="w-full sm:w-2/5 flex flex-wrap sm:flex-nowrap gap-5 items-center justify-center sm:justify-start">
            {
                availableFilters.map((filter, index) => {
                    const baseStyle = "w-1/2 min-w-28 rounded-md p-2 hover:bg-secondary-purple";
                    const activeStyle = "bg-secondary-purple";
                    const className = selectedFilter === filter ? `${baseStyle} ${activeStyle}` : baseStyle;

                    return (
                        <Button
                            key={index}
                            className={className}
                            onClick={() => setSelectedFilter(filter)}>
                            {filter}
                        </Button>
                    );
                })
            }
        </div>
    )

    // wait for bookings data to be loaded
    if (isLoading) {
        return (
            <Loader
                loadingText={"loading . . ."}
                isLoading={isLoading}
                size={100}
                speed={1.5}
            />
        );
    } else {

        // filtered bookings array based on the selected filter
        const filteredBookings = bookingsData.filter((booking) => {
            return filterOptions[selectedFilter].includes(booking.bookingStatus);
        });

        // map each booking info into a BookingCard
        const displayedBookingsJsx = filteredBookings.map((booking) => {

            return (
                <BookingCard
                    key={booking._id}
                    bookingId={booking._id}
                    serviceName={booking.serviceName}
                    serviceDesc={booking.serviceDesc}
                    bookingPrice={booking.bookingPrice}
                    serviceImageData={booking.serviceImageData}
                    bookingStartDateTime={booking.bookingStartDateTime}
                    bookingStatus={booking.bookingStatus}
                    bookingIsReviewed={booking.bookingIsReviewed}
                    userType={'artist'}
                ></BookingCard>
            );
        })

        // Booking tab with the list view only (for now)
        return (
            <div className="flex flex-col gap-6 mt-2">

                {/*top button row*/}
                <div className={"flex flex-col-reverse gap-y-6 items xl:flex-row xl:items-center xl:justify-between"}>

                    {/*left side buttons, depends on current view*/}
                    {bookingView === "list" ? filterButtons : "filter buttons for calendar view"}

                    {/*right side buttons/drop down*/}
                    <div
                        className={"flex flex-col-reverse items-center justify-center sm:flex-row sm:items-center sm:justify-end gap-6"}>
                        {/*drop down for the view*/}
                        <select defaultValue={"list"} onChange={handleViewChange} className="input-base w-40 min-w-40">
                            <option value="calendar">Calendar View</option>
                            <option value="list">List View</option>
                        </select>

                        {/*add availability button on the right*/}
                        <Button
                            className="flex flex-row gap-x-1.5 min-w-48 items-center justify-center
                        bg-secondary-purple hover:bg-secondary-purple-hover">
                            <PlusIcon className="icon-base"/> Add Availability
                        </Button>
                    </div>
                </div>

                {/*bottom tab with booking*/}
                {
                    bookingView === "list" ?
                        // rendering filtered bookings based on the applied filter
                        <BookingListView displayBookings={displayedBookingsJsx}/> :
                        <span>Calendar view component here</span>
                }
            </div>
        )

    }
};

export default ArtistBookingsTab;