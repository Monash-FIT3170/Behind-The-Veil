/**
 * File Description: Artist gallery tab
 * File version: 1.1
 * Contributors: Kefei (Phillip) Li, Laura, Nikki
 */

import React, {useState} from 'react';
import {PlusIcon,} from "@heroicons/react/24/outline";

import Button from "../../button/Button";
import BookingCard from "../../card/BookingCard";
import {BookingStatus} from "../../../enums/BookingStatus";
import {BookingFilter} from "../../../enums/BookingsFilterEnum";
import Pagination from "../../pagination/Pagination";
import BookingListView from "../../booking/BookingListView";


/**
 * Page of a list of Artist cards for users to see
 */
export const ArtistBookingsTab = () => {
    // booking view, calendar or list
    const [bookingView, setBookingView] = useState("list"); // todo: calendar view

    // view drop down handler
    const handleViewChange = (event) => {
        setBookingView(event.target.value);
    };

    // mock bookings, todo: replace with db calls
    const MOCK_BOOKINGS = [
        {
            bookingId: "1",
            serviceName: "Bachelorette Glam Experience",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 123.00,
            serviceImageData: "/images/unsplash-amir-seilsepour.png",
            bookingStartDateTime: "Tuesday, 12 May, 2024",
            bookingStatus: BookingStatus.COMPLETED
        },
        {
            bookingId: "2",
            serviceName: "GlamourGlow Beauty",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 42142.01,
            serviceImageData: "/images/pexels-christian-diokno-1666462-3260852.jpg",
            bookingStartDateTime: "Thursday, 14 May, 2024",
            bookingStatus: BookingStatus.COMPLETED
        },
        {
            bookingId: "3",
            serviceName: "Bridal Glam Affair",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 213.57,
            serviceImageData: "/images/unsplash-valerie-elash-bI8Yv7AH6b0.jpg",
            bookingStartDateTime: "Friday, 15 May, 2024",
            bookingStatus: BookingStatus.CONFIRMED
        },
        {
            bookingId: "4",
            serviceName: "Bachelorette Glam Experience",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 120.32,
            serviceImageData: "/images/unsplash-amir-seilsepour.png",
            bookingStartDateTime: "Saturday, 16 May, 2024",
            bookingStatus: BookingStatus.PENDING
        },
        {
            bookingId: "5",
            serviceName: "GlamourGlow Beauty",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 167.00,
            serviceImageData: "/images/pexels-christian-diokno-1666462-3260852.jpg",
            bookingStartDateTime: "Monday, 18 May, 2024",
            bookingStatus: BookingStatus.REJECTED
        },
        {
            bookingId: "6",
            serviceName: "Bridal Glam Affair",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 123.90,
            serviceImageData: "/images/unsplash-valerie-elash-bI8Yv7AH6b0.jpg",
            bookingStartDateTime: "Tuesday, 19 May, 2024",
            bookingStatus: BookingStatus.CANCELLED
        }]

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
                availableFilters.map((filter) => {
                    const baseStyle = "w-1/2 min-w-28 rounded-md p-2 hover:bg-secondary-purple";
                    const activeStyle = "bg-secondary-purple";
                    const className = selectedFilter === filter ? `${baseStyle} ${activeStyle}` : baseStyle;

                    return (
                        <Button
                            keuy={filter}
                            className={className}
                            onClick={() => setSelectedFilter(filter)}>
                            {filter}
                        </Button>
                    );
                })
            }
        </div>
    )

    // filtered bookings array based on the selected filter
    const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
        return filterOptions[selectedFilter].includes(booking.bookingStatus);
    });

    // map each booking info into a BookingCard
    const displayedBookingsJsx = filteredBookings.map((booking) => {
        return (
            <BookingCard
                className=""
                key={booking.bookingId}
                bookingId={booking.bookingId}
                serviceName={booking.serviceName}
                serviceDesc={booking.serviceDesc}
                servicePrice={booking.servicePrice}
                serviceImageData={booking.serviceImageData}
                bookingStartDateTime={booking.bookingStartDateTime}
                bookingStatus={booking.bookingStatus}
            ></BookingCard>
        );
    })

    // Booking tab with the list view only (for now)
    return (
        <div className="relative mt-2 min-w-2">

            {/*top button row*/}
            <div className={"flex flex-col-reverse gap-y-6 items xl:flex-row xl:items-center xl:justify-between"}>

                {/*left side buttons, depends on current view*/}
                {bookingView === "list" ? filterButtons : <div>Calendar view buttons to be done</div>}

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
            {
                bookingView === "list" ?
                    // rendering filtered bookings based on the applied filter
                    <BookingListView displayBookings={displayedBookingsJsx}/> :
                    <span>Calendar view component here</span>
            }
        </div>
    )
};

export default ArtistBookingsTab;