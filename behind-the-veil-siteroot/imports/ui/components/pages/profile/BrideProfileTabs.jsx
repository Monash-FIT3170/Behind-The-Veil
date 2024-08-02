/**
 * File Description: Brides profile page tabs
 * File version: 2.3
 * Contributors: Katie, Nikki
 */

import React from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import BookingCollection from "../../../../api/collections/bookings";
import ServiceCollection from "../../../../api/collections/services";
import ImageCollection from "../../../../api/collections/images";

import Tabs from "../../../components/tabs/Tabs";
import Loader from "../../../components/loader/Loader";
import BookingListView from "../../../components/booking/BookingListView";
import BookingCard from "../../../components/card/BookingCard";
import BookingStatus from "../../../../ui/enums/BookingStatus";

/**
 * Component for bride's profile tabs
 *
 * @param userInfo - logged-in user information passed in
 */
export const BrideProfileTabs = ({userInfo}) => {

    // get bookings information from database
    const isLoadingBooking = useSubscribe('all_user_bookings', userInfo.username);
    const isLoadingService = useSubscribe('all_services');
    const isLoadingServiceImage = useSubscribe('service_images');

    let bookingsData = useTracker(() => {

        return BookingCollection.find({
            $or: [
                {"brideUsername": userInfo.username},
                {"artistUsername": userInfo.username}
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
            bookings[status] = bookings[status].map((booking, index) => (
                <BookingCard
                    key={index}
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