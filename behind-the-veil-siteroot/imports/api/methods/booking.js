/**
 * File Description: Booking database entity
 * File version: 1.0
 * Contributors: Neth
 */
import {Meteor} from 'meteor/meteor'
import {BookingCollection} from "../collections/booking";

Meteor.methods({
    "add_booking": function (bookingStartDateTime, bookingEndDateTime, bookingLocation, bookingPrice, bookingStatus, brideUsername, artistUsername, serviceId) {

        /**
         * Adds a new booking to the database.
         * @param {Date} bookingStartDateTime - The start date and time of the booking.
         * @param {Date} bookingEndDateTime - The end date and time of the booking.
         * @param {string} bookingLocation - The location of the booking.
         * @param {number} bookingPrice - The price of the booking.
         * @param {string} bookingStatus - The status of the booking.
         * @param {string} brideUsername - The username of the bride associated with the booking.
         * @param {string} artistUsername - The username of the artist associated with the booking.
         * @param {string} serviceId - The ID of the service booked.
         * @returns {string} - The unique ID of the newly created booking.
         */
        return BookingCollection.insert(
            {
                "bookingStartDateTime": bookingStartDateTime,
                "bookingEndDateTime": bookingEndDateTime,
                "bookingLocation": bookingLocation,
                "bookingPrice": bookingPrice,
                "bookingStatus": bookingStatus,
                "brideUsername": brideUsername,
                "artistUsername": artistUsername,
                "serviceId": serviceId
            }
        );
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