/**
 * File Description: Booking database entity
 * File version: 1.0
 * Contributors: Neth
 */
import {BookingCollection} from "../collections/booking";

Meteor.methods({
    "add_booking": function (startDateTime, endDateTime, location, price, status, brideUsername, artistUsername, serviceId) {
        /**
         * Adds a new booking to the database.
         * @param {Date} startDateTime - The start date and time of the booking.
         * @param {Date} endDateTime - The end date and time of the booking.
         * @param {string} location - The location of the booking.
         * @param {number} price - The price of the booking.
         * @param {string} status - The status of the booking.
         * @param {string} brideUsername - The username of the bride associated with the booking.
         * @param {string} artistUsername - The username of the artist associated with the booking.
         * @param {string} serviceId - The ID of the service booked.
         * @returns {string} The unique ID of the newly created booking.
         */
        BookingCollection.insert({
            bookingStartDateTime: startDateTime,
            bookingEndDateTime: endDateTime,
            bookingLocation: location,
            bookingPrice: price,
            bookingStatus: status,
            brideUsername: brideUsername,
            artistUsername: artistUsername,
            serviceId: serviceId
        });
    },

    /**
     * Retrieves a single booking instance from the database based on the booking ID.
     * @param {string} bookingId - The ID of the booking to retrieve.
     * @returns {object|null} - The booking object if found, otherwise null.
     */
    "get_booking": function (bookingId) {
        return BookingCollection.findOne(
            {_id: bookingId},
        )
    },

    /**
     * Updates multiple fields of a booking instance in the database.
     * @param {string} bookingId - The ID of the booking to update.
     * @param {string[]} updateFields - An array of field names to update.
     * @param {any[]} updateValues - An array of new values for the updateFields.
     */
    "update_booking_details": function (bookingId, updateFields, updateValues) {
        // Construct the update object for multiple fields
        let updateObject = {};
        for (let i = 0; i < updateFields.length; i++) {
            updateObject[updateFields[i]] = updateValues[i];
        }

        // Update the booking document for multiple fields
        BookingCollection.update(
            { _id: bookingId },
            { $set: updateObject},
        );
    }
})