/**
 * File Description: Brides profile page tabs
 * File version: 2.4
 * Contributors: Katie, Nikki
 */

import React from 'react';

import Tabs from "../../../components/tabs/Tabs";
import Loader from "../../../components/loader/Loader";
import BookingListView from "../../../components/booking/BookingListView";
import BookingCard from "../../../components/card/BookingCard";
import BookingStatus from "../../../../ui/enums/BookingStatus";
import {useBookings} from "../../DatabaseHelper";

/**
 * Component for bride's profile tabs
 *
 * @param userInfo - logged-in user information passed in
 */
export const BrideProfileTabs = ({userInfo}) => {

    // get bookings information from database
    const bookingFilter = {
        $or: [
            { "brideUsername": userInfo.username },
            { "artistUsername": userInfo.username }
        ]
    }
    const {isLoading, bookingsData} = useBookings("all_user_bookings", [userInfo.username], bookingFilter);

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
        // data is loaded

        // grouping the bookings into their status
        let bookings = {
            confirmed: [],
            pending: [],
            past: [],
            archived: []
        }

        // put each booking into the array according to its status
        for (let booking of bookingsData) {
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
    }
};

export default BrideProfileTabs;