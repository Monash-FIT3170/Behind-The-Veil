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
    return ReviewCollection.find({bookingId: bookingId});
});

/**
 * Publishes reviews for a specific artist to the client.
 * This method filters the reviews by the provided artistUsername.
 * Use this method to retrieve only the reviews associated with a particular artist.
 * Be mindful of performance when querying large collections, as the results
 * are filtered by artistUsername but still might be numerous depending on the artist's reviews.
 *
 * @param {String} username - The username of the artist to filter reviews by.
 * @returns {Mongo.Cursor} - A cursor representing the result set of reviews for the specified artist.
 */

Meteor.publish('artist_reviews', function(username) {
    return ReviewCollection.find({artistUsername: username});
})