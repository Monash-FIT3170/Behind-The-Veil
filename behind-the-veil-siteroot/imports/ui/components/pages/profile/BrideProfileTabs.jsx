/**
 * File Description: Brides profile page tabs
 * File version: 2.1
 * Contributors: Katie, Nikki
 */

import React from 'react';
import Tabs from "../../tabs/Tabs";
import BookingStatus from "../../../enums/BookingStatus";
import BookingCard from "../../card/BookingCard";
import BookingListView from "../../booking/BookingListView";


/**
 * Component for bride profile tabs
 */
export const BrideProfileTabs = ({userInfo}) => {
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
            bookingStatus: BookingStatus.PENDING
        },
        {
            bookingId: "7",
            serviceName: "GlamourGlow Beauty",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 183.90,
            serviceImageData: "/images/unsplash-valerie-elash-bI8Yv7AH6b0.jpg",
            bookingStartDateTime: "Tuesday, 19 May, 2024",
            bookingStatus: BookingStatus.CANCELLED
        },
        {
            bookingId: "8",
            serviceName: "Bachelorette Glam Experience",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 391.90,
            serviceImageData: "/images/unsplash-valerie-elash-bI8Yv7AH6b0.jpg",
            bookingStartDateTime: "Tuesday, 19 May, 2024",
            bookingStatus: BookingStatus.PENDING
        }
    ]

    // grouping the bookings into their status
    let bookings = {
        confirmed: [],
        pending: [],
        past: [],
        archived: []
    }

    // put each booking into the array according to its status
    for (let booking of MOCK_BOOKINGS) {
        switch (booking.bookingStatus) {
            case BookingStatus.CONFIRMED || BookingStatus.OVERDUE:
                bookings.confirmed.push(booking);
                break;
            case BookingStatus.PENDING:
                bookings.pending.push(booking);
                break;
            case BookingStatus.COMPLETED:
                bookings.past.push(booking);
                break;
            case BookingStatus.REJECTED:
            case BookingStatus.CANCELLED:
                bookings.archived.push(booking);
                break;
            default:
                break;
        }
    }

    // map every booking to a JSX object
    for (let status in bookings) {

        bookings[status] = bookings[status].map((booking) => (
            <BookingCard key={booking.bookingId}
                         bookingId={booking.bookingId}
                         serviceName={booking.serviceName}
                         serviceDesc={booking.serviceDesc}
                         servicePrice={booking.servicePrice}
                         serviceImageData={booking.serviceImageData}
                         bookingStartDateTime={booking.bookingStartDateTime}
                         bookingStatus={booking.bookingStatus}
                         userType={'bride'}
            />
        ));
    }

    return (
        <Tabs
            tabs={[
                <span key={1}>Confirmed Bookings</span>,
                <span key={2}>Pending Bookings</span>,
                <span key={3}>Past Bookings</span>,
                <span key={4}>Archived Bookings</span>
            ]}
            tabPanels={[
                <BookingListView key={"confirmed"} displayBookings={bookings["confirmed"]}/>,
                <BookingListView key={"pending"} displayBookings={bookings["pending"]}/>,
                <BookingListView key={"past"} displayBookings={bookings["past"]}/>,
                <BookingListView key={"archived"} displayBookings={bookings["archived"]}/>
            ]}
        />
    );
};

export default BrideProfileTabs;