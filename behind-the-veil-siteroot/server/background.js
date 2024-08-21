import { Meteor } from 'meteor/meteor';
import { BookingStatus } from '/imports/ui/enums/BookingStatus';
import { addHours } from "date-fns";

export const checkBookings = () => {

    const now = new Date();

    // Check all bookings with confirmed status
    Meteor.call('get_bookings_by_status', BookingStatus.CONFIRMED, (error, confirmedBookings) => {
        if (error) {
            console.error("Error fetching confirmed bookings:", error);
            return;
        }

        confirmedBookings.forEach((booking) => {
            const confirmedBookingEnd = addHours(booking.bookingStartDateTime, booking.bookingDuration)

            if (confirmedBookingEnd < now) {  
                Meteor.call('update_booking_details', booking._id, { bookingStatus: BookingStatus.OVERDUE });
            }
        });
    });

    // Check all bookings with pending status
    Meteor.call('get_bookings_by_status', BookingStatus.PENDING, (error, pendingBookings) => {
        if (error) {
            console.error("Error fetching pending bookings:", error);
            return;
        }
        console.log(pendingBookings)

        pendingBookings.forEach((booking) => {
            const eventDate = new Date(booking.bookingStartDateTime);

            // Check if the event date is today
            const isPassed = (eventDate < now);

            if (isPassed) {
                Meteor.call('update_booking_details', booking._id, { bookingStatus: BookingStatus.REJECTED });
            }
        })
    })
};

export const checkBookingsEveryMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0); // Set to midnight
    const timeUntilMidnight = midnight - now;

    // Run the task immediately and then at the specified time daily
    Meteor.setTimeout(() => {
        checkBookings();
        Meteor.setInterval(checkBookings, 1000 * 60 * 60 * 24);
    }, timeUntilMidnight);
};