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

const BookingListView = () => {
    const MOCK_BOOKING_DETAILS = {
      service: "Bachelorette Glam Experience",
      date: "Tuesday, 12 May, 2024",
      artist: "Alice Tran",
      price: "$120"
    }
    
    //filters
    const availableFilters = Object.values(BookingFilter);
    const [selectedFilter, setSelectedFilter] = useState(BookingFilter.ALL);

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
        <div>

        </div>
        </div>

        

    )
    };
    
    export default BookingListView;
    