/**
 * File Description: Review database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import {Meteor} from 'meteor/meteor'
import { ReviewCollection } from "../collections/reviews";

/**
 * Publishes one review based on given associated booking ID to the client.
 *
 * @param {string} bookingId - The booking ID associated with the review to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result the service to be published.
 */
Meteor.publish('specific_review', function(bookingId) {
    // Check if the username matches either the user
    return ReviewCollection.find({_id: bookingId});
});
