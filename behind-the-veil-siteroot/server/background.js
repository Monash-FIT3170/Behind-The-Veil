import { Meteor } from 'meteor/meteor';
import { BookingStatus } from '/imports/ui/enums/BookingStatus';

export const checkBookings = () => {
    Meteor.setInterval(() => {
        const now = new Date();

        // Check all bookings with confirmed status
        Meteor.call('get_bookings_by_status', BookingStatus.CONFIRMED, (confirmedBookings) => {

            confirmedBookings.forEach((booking) => {
                //const bookingStartDateTime = new Date(booking.bookingStartDateTime);
                //const bookingEndDateTime = new Date(bookingStartDateTime.getTime() + booking.duration * 60 * 60 * 1000);

                const confirmedBookingEnd = addHours(confirmedBookingStart, booking.bookingDuration)

                if (confirmedBookingEnd < now) {  
                    BookingCollection.update_booking_details(booking._id, {
                        $set: { bookingStatus: BookingStatus.OVERDUE },
                    });
                }
            });
        });

        // Check all bookings with pending status
        Meteor.call('get_bookings_by_status', BookingStatus.PENDING, (confirmedBookings) => {

            confirmedBookings.forEach((booking) => {
                const eventDate = new Date(booking.eventDate);

                // Check if the event date is today
                const isToday = (eventDate.getFullYear() === now.getFullYear() &&
                                eventDate.getMonth() === now.getMonth() &&
                                eventDate.getDate() === now.getDate());

                if (isToday) {
                    BookingCollection.update(booking._id, {
                        $set: { bookingStatus: BookingStatus.REJECTED },
                    });
                }
            });
        });

    }, 1000 * 60 * 60 * 24); // Runs every 24 hours
};

export const checkBookingsEveryMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight
    const timeUntilMidnight = midnight - now;

    // Run the task immediately and then at the specified time daily
    Meteor.setTimeout(() => {
        checkBookings();
        Meteor.setInterval(runDailyTask, 1000 * 60 * 60 * 24);
    }, timeUntilMidnight);
};