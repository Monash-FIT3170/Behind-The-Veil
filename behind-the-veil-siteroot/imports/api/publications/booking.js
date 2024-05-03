/**
 * File Description: Booking database entity
 * File version: 1.0
 * Contributors: Neth
 */
import {Meteor} from 'meteor/meteor'
import BookingCollection from "../collections/booking";

/**
 * Publishes all bookings associated with a specific user to the client.
 * This publication filters bookings based on the provided username,
 * retrieving bookings where the username matches either the
 * brideUsername or artistUsername fields.
 * @param {string} username - The username of the user whose bookings are to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result set of bookings to be published.
 */
Meteor.publish('all_user_bookings', function(username) {
    // Check if the userid matches either the brideUsername or artistUsername
    return BookingCollection.find({
        $or: [
            { brideUsername: username },
            { artistUsername: username }
        ]
    });
});