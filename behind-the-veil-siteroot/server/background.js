/**
 * File Description: Background task to update bookings
 * File version: 1.1
 * Contributors: Laura, Nikki
 */

import { Meteor } from 'meteor/meteor';
import { BookingStatus } from '../imports/ui/enums/BookingStatus';
import {updateBookingStatus} from "../imports/ui/components/DatabaseHelper";
import {sendUnrespondedBookingEmail} from "../imports/api/mailer";

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
            const confirmedBookingEnd = new Date(booking.bookingEndDateTime)

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

        let checkedArtists = []
        pendingBookings.forEach((booking) => {
            const eventDate = new Date(booking.bookingStartDateTime);
            const isPassed = (eventDate < now);

            if (isPassed) {
                updateBookingStatus(booking._id, BookingStatus.REJECTED)
            } else {
                // Check if the event date is 2 weeks away
                const timeDifference = eventDate - now;
                const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

                // Check if the booking was created 3 days ago
                const bookingCreatedDate = new Date(booking.bookingCreatedDate);
                const createdTimeDifference = now - bookingCreatedDate;
                const createdDaysDifference = Math.floor(createdTimeDifference / (1000 * 60 * 60 * 24));

                // Remind the artist every 3 days of the unresponded booking or 2 weeks before the event
                if (!checkedArtists.includes(booking.artistUsername) && (createdDaysDifference % 3 === 0 || daysDifference <= 14)) {
                    checkedArtists.push(booking.artistUsername);
                    sendUnrespondedBookingEmail(booking.artistUsername);
                }
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