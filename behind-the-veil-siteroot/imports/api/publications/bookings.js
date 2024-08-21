/**
 * File Description: Booking database entity
 * File version: 1.1
 * Contributors: Neth, Nikki
 */
import {Meteor} from 'meteor/meteor'
import BookingCollection from "../collections/bookings";

/**
 * Publishes all bookings associated with a specific user to the client.
 * This publication filters bookings based on the provided username,
 * retrieving bookings where the username matches either the
 * brideUsername or artistUsername fields.
 * @param {string} username - The username of the user whose bookings are to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result set of bookings to be published.
 */
Meteor.publish('all_user_bookings', function (username) {
    // Check if the userid matches either the brideUsername or artistUsername
    return BookingCollection.find({
        $or: [
            {brideUsername: username},
            {artistUsername: username}
        ]
    });
});

/**
 * Publishes one booking based on given booking ID to the client.
 * @param {string} bookingId - The ID of the service to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result the booking to be published.
 */
Meteor.publish('specific_booking', function (bookingId) {
    return BookingCollection.find({_id: bookingId});
    // create a mongo ID object to query for ID
    const idObject = new Mongo.ObjectID(bookingId);
    return BookingCollection.find({_id: idObject});
});

Meteor.publish("all_user_complete_bookings", function(username){
    return BookingCollection.find({
        $and: [
            {artistUsername: username},
            {bookingStatus: "complete"}
        ]
    });
});

Meteor.publish("all_user_pending_bookings", function(username){
    return BookingCollection.find({
        $and: [
            {artistUsername: username},
            {bookingStatus: "pending"}
        ]
    });
});

// TODO: create publications for just artist/bride bookings for a specific username instead of all
Meteor.publish('artist_bookings', function (artistUsername) {
    return BookingCollection.find({
        artistUsername: artistUsername
    })
})