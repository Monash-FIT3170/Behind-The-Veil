/**
 * File Description: Background task to update bookings
 * File version: 1.1
 * Contributors: Laura, Nikki
 */

import { Meteor } from 'meteor/meteor';
import { BookingStatus } from '/imports/ui/enums/BookingStatus';
import { addHours } from "date-fns";
import {updateBookingStatus} from "../imports/ui/components/DatabaseHelper";

// Update all bookings
export const checkBookings = () => {

    const now = new Date();

    // Check all bookings with confirmed status
    Meteor.call('get_bookings_by_status', BookingStatus.CONFIRMED, (error, confirmedBookings) => {
        if (error) {
            console.error("Error fetching confirmed bookings:", error);
            return;
        }

        confirmedBookings.forEach((booking) => {
            const confirmedBookingEnd = booking.bookingEndDateTime

            if (confirmedBookingEnd < now) {
                updateBookingStatus(booking._id, BookingStatus.OVERDUE)
            }
        });
    });

    // Check all bookings with pending status
    Meteor.call('get_bookings_by_status', BookingStatus.PENDING, (error, pendingBookings) => {
        if (error) {
            console.error("Error fetching pending bookings:", error);
            return;
        }

        pendingBookings.forEach((booking) => {
            const eventDate = new Date(booking.bookingStartDateTime);
            const isPassed = (eventDate < now);

            if (isPassed) {
                updateBookingStatus(booking._id, BookingStatus.REJECTED)
            }
        })
    })
};

// Run the task every midnight
export const checkBookingsEveryMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    const timeUntilMidnight = midnight - now;

    // Run the task immediately and then at midnight
    Meteor.setTimeout(() => {
        checkBookings();
        Meteor.setInterval(checkBookings, 1000 * 60 * 60 * 24);
    }, timeUntilMidnight);
};