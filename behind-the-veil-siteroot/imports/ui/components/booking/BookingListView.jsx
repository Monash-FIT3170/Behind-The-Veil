/**
 * File Description: Service card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import { BookingStatus } from '../../enums/BookingStatus';
import { BookingFilter } from '../booking/BookingsFiltersEnum'
import Button from '../button/Button';
import BookingCard from '../card/BookingCard';

const BookingListView = () => {

    //filters
    const availableFilters = Object.values(BookingFilter);
    const [selectedFilter, setSelectedFilter] = useState(BookingFilter.ALL);

    const MOCK_BOOKINGS = [
        {
            bookingId: "1",
            serviceName: "Bachelorette Glam Experience",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 123,
            serviceImageData: "",
            bookingStartDateTime: "Tuesday, 12 May, 2024",
            bookingStatus: BookingStatus.CONFIRMED
        },
        {
            bookingId: "2",
            serviceName: "GlamourGlow Beauty",
            serviceDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n",
            servicePrice: 123,
            serviceImageData: "",
            bookingStartDateTime: "Thursday, 14 May, 2024",
            bookingStatus: BookingStatus.CONFIRMED
        }]

    return (
        <div className="mt-2">
            <div className="w-1/2 grid grid-cols-5 gap-5">
                {availableFilters.map((filter) => {
                const baseStyle = "w-full rounded-md p-2 hover:bg-secondary-purple";
                const activeStyle = "bg-secondary-purple";
                const className = selectedFilter === filter ? `${baseStyle} ${activeStyle}` : baseStyle;

                return (
                    <Button
                    className={className}
                    onClick={() => setSelectedFilter(filter)}
                    >
                    {filter}
                    </Button>
                );
                })}
            </div>
        <div className="mt-6">
            <div className="flex flex-col">
                {MOCK_BOOKINGS.map((booking) => {
                return (
                    <BookingCard
                        className="mb-4"
                        bookingId={booking.bookingId}
                        serviceName={booking.serviceName}
                        serviceDesc={booking.serviceDesc}
                        servicePrice={booking.servicePrice}
                        servicePhotoData={""}
                        bookingStartDateTime={booking.bookingStartDateTime}
                        bookingStatus={booking.bookingStatus}
                    ></BookingCard>
                );
                })}
            </div>
        </div>
        </div>

        

    )
    };
    
    export default BookingListView;
    