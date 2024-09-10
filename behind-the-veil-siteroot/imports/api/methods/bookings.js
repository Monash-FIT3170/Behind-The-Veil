/**
 * File Description: Booking database entity
 * File version: 1.1
 * Contributors: Neth, Nikki, Katie
 */
import { BookingCollection } from "../collections/bookings";
import {sendNewBookingEmail} from "../../../server/mailer";
import { check } from 'meteor/check';
import { Match } from "meteor/check";


Meteor.methods({
    /**
     * Adds a new booking to the database.
     * @param {Date} startDateTime - The start date and time of the booking.
     * @param {Date} bookingEndDateTime - The end date and time of the booking.
     * @param {string} location - The location of the booking.
     * @param {number} price - The price of the booking.
     * @param {string} status - The status of the booking.
     * @param {string} brideUsername - The username of the bride associated with the booking.
     * @param {string} artistUsername - The username of the artist associated with the booking.
     * @param {string} serviceId - The ID of the service booked.
     * @returns {string} The unique ID of the newly created booking.
     */
    "add_booking": function (startDateTime, bookingEndDateTime, location, price, status, brideUsername, artistUsername, serviceId) {
        // Check is needed to validate the right booking data and santise the inputs
        check(startDateTime, Date)
        check(bookingEndDateTime, Date)
        check(location, String)
        check(price, Number)
        check(status, String)
        check(brideUsername, String)
        check(artistUsername, String)
        check(serviceId, String)
            
        const newBookingId = BookingCollection.insert({
            bookingStartDateTime: startDateTime,
            bookingEndDateTime: bookingEndDateTime,
            bookingLocation: location,
            bookingPrice: price,
            bookingStatus: status,
            bookingIsReviewed: false,
            brideUsername: brideUsername,
            artistUsername: artistUsername,
            serviceId: serviceId
        });

        sendNewBookingEmail(newBookingId);
        return newBookingId;
    },

    /**
     * Retrieves a single booking instance from the database based on the booking ID.
     * @param {string} bookingId - The ID of the booking to retrieve.
     * @returns {object|null} - The booking object if found, otherwise null.
     */
    "get_booking": function (bookingId) {
        check(bookingId, String)
        return BookingCollection.findOne(
            { _id: bookingId },
        )
    },

    /**
     * Updates multiple fields of a booking instance in the database.
     * @param {string} bookingId - The ID of the booking to update.
     * @param {object} updateObject - Field and value object of elements that need to be upgraded
     */
    "update_booking_details": function (bookingId, updateObject) {
        check(bookingId, String)
        check(updateObject, Object)

        BookingCollection.update(
            { _id: bookingId },
            { $set: updateObject },
        );
    },

    /**
     * If there is a booking that exists with the service that matches the service ID, then the method will return true. If not, the method will return false.
     * @param {int} serviceId - The ID of the service.
     */
    "has_booking_of_service": function (serviceId) {
        check(serviceId, Match.Integer)

        const booking = BookingCollection.findOne({ serviceId: serviceId });
    
        return !!booking;
    },

    /**
     * Retrieves all bookings with a specific status.
     * @param {BookingStatus} bookingStatus - The status of the bookings to retrieve.
     * @returns {Array} - An array of booking objects that match the given status.
     */
    "get_bookings_by_status": function (bookingStatus) {
        check(bookingStatus, String)

        return BookingCollection.find({ bookingStatus: bookingStatus }).fetch();
    }
})